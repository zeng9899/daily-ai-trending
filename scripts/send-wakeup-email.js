const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true,
  auth: {
    user: '843523392@qq.com',
    pass: 'niymqhborndtbbee'
  }
});

async function sendWakeupEmail() {
  const mailOptions = {
    from: '"Faker 🎭" <843523392@qq.com>',
    to: '843523392@qq.com',
    subject: '早上好 Boss！☀️',
    text: '新的一天开始了，该起床了！\n\n祝你今天一切顺利！',
    html: `
      <h2>早上好 Boss！☀️</h2>
      <p>新的一天开始了，该起床了！</p>
      <p>祝你今天一切顺利！🎭</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ 起床邮件已发送');
  } catch (error) {
    console.error('❌ 邮件发送失败:', error);
    process.exit(1);
  }
}

sendWakeupEmail();
