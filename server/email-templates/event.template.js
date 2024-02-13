"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const performanceEmailTemplate = (url, performance) => {
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Performance Update</title>
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

              .performance-details {
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
                  <h2>Event Update</h2>
              </div>
              <div class="content">
                  <p class="info"><strong>Date:</strong> ${performance.month} ${performance.day}, ${performance.year}</p>
                  ${performance.period !== 'once' ? `<p class="info"><strong>And recurring:</strong> ${performance.period}</p>` : ''}
                  <p class="info"><strong>Time:</strong> ${performance.time}</p>
                  ${performance.addressLine1 ? `<p class="info"><strong>Address Line 1:</strong> ${performance.addressLine1}</p>` : ''}
                  ${performance.addressLine2 ? `<p class="info"><strong>Address Line 2:</strong> ${performance.addressLine2}</p>` : ''}
                  <p class="info"><strong>Venue Name:</strong> ${performance.venueName}</p>
                  <p class="info"><strong>Description:</strong> ${performance.description}</p>
                  ${performance.venueWebsite ? `<p class="info"><strong>Venue Website:</strong> <a href="${performance.venueWebsite}" target="_blank">${performance.venueWebsite}</a></p>` : ''}
                  <a href="${url}" class="view-link">View Performance Details</a>
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
exports.default = performanceEmailTemplate;
// Example usage:
// const url: string = 'https://example.com/performance/details';
// const performanceObject: PerformanceEv = {
//   day: 15,
//   month: 'February',
//   year: 2024,
//   time: '1030pm',
//   period: 'once',
//   addressLine1: '123 Main Street',
//   venueName: 'Concert Hall',
//   description: 'An evening of live music and entertainment',
//   venueWebsite: 'https://concert-hall.com'
// };
// const emailTemplate: string = createPerformanceEmailTemplate(url, performanceObject);
// console.log(emailTemplate);
