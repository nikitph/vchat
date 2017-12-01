export function sendEmail (to, subject, body) {

  const apiKey = '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';

  return fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + apiKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "personalizations": [{"to": [{"email": to}]}],
      "from": {"email": "info@vpchat.com"},
      "subject": subject,
      "content": [{"type": "text/plain", "value": body}]
    })
  });
}
