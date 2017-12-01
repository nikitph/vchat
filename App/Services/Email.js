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
