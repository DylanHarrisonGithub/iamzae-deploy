"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const newsEmailTemplate = (url, news) => {
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>News Update</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
                  text-align: center;
              }

              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }

              .header {
                  background-color: #007bff;
                  color: #ffffff;
                  padding: 10px;
                  border-radius: 8px 8px 0 0;
              }

              .content {
                  padding: 20px;
              }

              .info {
                  font-size: 16px;
                  color: #333333;
                  margin-bottom: 20px;
              }

              .news-body {
                  margin-top: 20px;
                  text-align: left;
              }

              .view-link {
                  display: inline-block;
                  padding: 10px;
                  background-color: #007bff;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
                  margin-top: 20px;
              }

              .footer {
                  margin-top: 20px;
                  color: #777777;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="header">
                  <h2>News Update from iamzae.com</h2>
              </div>
              <div class="content">
                  <p class="info"><strong>Subject:</strong> ${news.subject}</p>
                  <p class="info"><strong>Date:</strong> ${news.month} ${news.day}, ${news.year}</p>
                  <div class="news-body">
                      <p>${news.body}</p>
                  </div>
                  <a href="${url}" class="view-link">View Update</a>
              </div>
              <div class="footer">
                  <p>If you have any questions, please contact us at iamzae.com</p>
                  <p>To opt out of email notifications, please visit iamzae.com, enter email at page bottom and click opt out</p>
              </div>
          </div>
      </body>
      </html>
  `;
    return htmlTemplate;
};
exports.default = newsEmailTemplate;
// Example usage:
// const url: string = 'https://example.com/news/update';
// const newsObject: News = {
//   subject: 'Important Announcement',
//   month: 'February',
//   day: 13,
//   year: 2024,
//   body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in turpis vel justo consequat aliquet.'
// };
// const emailTemplate: string = createNewsEmailTemplate(url, newsObject);
// console.log(emailTemplate);
