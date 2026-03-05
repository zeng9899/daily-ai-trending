const nodemailer = require('nodemailer');

async function sendWakeUpEmail() {
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
      user: '843523392@qq.com',
      pass: 'niymqhborndtbbee'
    }
  });

  const mailOptions = {
    from: '"Faker 🎭" <843523392@qq.com>',
    to: '843523392@qq.com',
    subject: '⏰ 起床啦 Boss!',
    text: '早上好 Boss！\n\n新的一天开始了，该起床了！☀️\n\n—— Faker 🎭',
    html: `
      <h2>☀️ 早上好 Boss!</h2>
      <p>新的一天开始了，该起床了！</p>
      <p>祝你今天一切顺利！💪</p>
      <hr>
      <p><em>—— Faker 🎭</em></p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ 起床邮件已发送!');
  } catch (error) {
    console.error('❌ 发送失败:', error);
    process.exit(1);
  }
}

sendWakeUpEmail();
