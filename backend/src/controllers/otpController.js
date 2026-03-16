import crypto from 'crypto';
import { Resend } from 'resend';
import User from '../models/User.js';

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper: Generate a 6-digit OTP
const generateOtp = () => String(Math.floor(100000 + Math.random() * 900000));

// @desc    Send OTP to email for password reset
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Forgot password request for:', email);
    if (!email) return res.status(400).json({ message: 'Email is required.' });

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for:', email);
      // Don't reveal if email exists
      return res.json({ message: 'If this email is registered, an OTP has been sent.' });
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = { code: otp, expiresAt };
    await user.save({ validateBeforeSave: false });
    console.log(`OTP generated for ${email}: ${otp}`);

    // Send OTP via Resend
    console.log('Sending email via Resend...');
    const data = await resend.emails.send({
      from: 'CookMate <onboarding@resend.dev>',
      to: email,
      subject: 'Your CookMate Password Reset OTP',
      html: `
        <div style="font-family:Inter,sans-serif;max-width:480px;margin:auto;padding:32px;background:#fff;border-radius:16px;border:1px solid #e5e7eb;">
          <h1 style="color:#FF6B6B;font-size:28px;margin-bottom:8px;">CookMate 🍳</h1>
          <p style="color:#374151;font-size:16px;margin-bottom:24px;">Use the OTP below to reset your password. It expires in <strong>10 minutes</strong>.</p>
          <div style="font-size:40px;font-weight:900;letter-spacing:12px;text-align:center;color:#111827;background:#F9FAFB;border:2px dashed #FF6B6B;border-radius:12px;padding:24px;">
            ${otp}
          </div>
          <p style="color:#9CA3AF;font-size:14px;margin-top:24px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });
    console.log('Resend response:', data);

    res.json({ message: 'If this email is registered, an OTP has been sent.' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
  }
};

// @desc    Verify OTP and reset password
// @route   POST /api/auth/reset-password
// @access  Public
export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const user = await User.findOne({ email });
    if (!user || !user.otp?.code) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    if (user.otp.code !== otp || user.otp.expiresAt < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    user.password = newPassword;
    user.otp = undefined;
    user.isVerified = true; // Auto-verify on successful OTP reset
    await user.save();

    res.json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during password reset.' });
  }
};
