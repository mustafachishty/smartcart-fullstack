const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "82da783a5183c3",
    pass: "b77d5f2bd57aaf"
  }
});

class EmailService {
  async sendWelcomeEmail(userEmail, userName) {
    const mailOptions = {
      from: '"SmartCart" <noreply@smartcart.com>',
      to: userEmail,
      subject: 'Welcome to SmartCart!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10b981;">Welcome to SmartCart, ${userName}!</h1>
          <p>Thank you for joining our community. Start exploring amazing products and enjoy shopping!</p>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>What's next?</h3>
            <ul>
              <li>Browse our product catalog</li>
              <li>Add items to your wishlist</li>
              <li>Start shopping and enjoy great deals</li>
            </ul>
          </div>
          <p>Happy shopping!</p>
          <p><strong>The SmartCart Team</strong></p>
        </div>
      `
    };

    return await transport.sendMail(mailOptions);
  }

  async sendOrderConfirmation(userEmail, userName, orderDetails) {
    const mailOptions = {
      from: '"SmartCart" <noreply@smartcart.com>',
      to: userEmail,
      subject: `Order Confirmation - #${orderDetails.orderId}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10b981;">Order Confirmed!</h1>
          <p>Hi ${userName},</p>
          <p>Your order has been confirmed and is being processed.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> #${orderDetails.orderId}</p>
            <p><strong>Total Amount:</strong> $${orderDetails.totalAmount}</p>
            <p><strong>Items:</strong> ${orderDetails.itemCount} items</p>
          </div>
          
          <p>We'll send you another email when your order ships.</p>
          <p><strong>The SmartCart Team</strong></p>
        </div>
      `
    };

    return await transport.sendMail(mailOptions);
  }

  async sendPasswordReset(userEmail, resetToken) {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;
    
    const mailOptions = {
      from: '"SmartCart" <noreply@smartcart.com>',
      to: userEmail,
      subject: 'Password Reset Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #10b981;">Password Reset Request</h1>
          <p>You requested a password reset for your SmartCart account.</p>
          
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p>Click the button below to reset your password:</p>
            <a href="${resetUrl}" style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0;">Reset Password</a>
          </div>
          
          <p>If you didn't request this, please ignore this email.</p>
          <p>This link will expire in 1 hour.</p>
          <p><strong>The SmartCart Team</strong></p>
        </div>
      `
    };

    return await transport.sendMail(mailOptions);
  }
}

module.exports = new EmailService();