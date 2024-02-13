"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const reviewEmailTemplate = (url, review) => {
    const generateStarRating = (stars) => {
        const goldStars = '&#9733;'.repeat(stars);
        const grayStars = '&#9734;'.repeat(5 - stars);
        return `<span class="stars">${goldStars}${grayStars}</span>`;
    };
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Review Approval</title>
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

              .stars {
                  font-size: 24px;
                  color: #ffd700; /* Gold color for stars */
              }

              .review-body {
                  margin-top: 20px;
                  text-align: left;
              }

              .approve-link {
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
                  <h2>Review Approval</h2>
              </div>
              <div class="content">
                  <p class="info"><strong>Review ID:</strong> ${review.id}</p>
                  <p class="info"><strong>Event ID:</strong> ${review.eventId}</p>
                  <p class="info"><strong>Date:</strong> ${review.month} ${review.day}, ${review.year}</p>
                  <p class="info"><strong>Name:</strong> ${review.name}</p>
                  <p class="info"><strong>Stars:</strong> ${generateStarRating(review.stars)}</p>
                  <div class="review-body">
                      <p class="message">${review.reviewBody}</p>
                  </div>
                  <a href="${url}" class="approve-link">View and Approve Review</a>
              </div>
              <div class="footer">
                  <p>If you have any questions, please contact us at support@example.com.</p>
              </div>
          </div>
      </body>
      </html>
  `;
    return htmlTemplate;
};
exports.default = reviewEmailTemplate;
