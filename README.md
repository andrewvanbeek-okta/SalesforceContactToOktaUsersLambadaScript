# SalesforceContactToOktaUsersLambadaScript

Purpose of this script is to automatically take your salesforce contact you create and automatically turn them into user accounts in your Okta Tenant.  This way as soon as one of your customers is added as a contact they could login into Okta or say one of your Okta Oauth powered applications a minute later.

Instructions are to basically populate your okta values 

here 

const client = new okta.Client({
  orgUrl: 'you okta url',
  token: 'your okta api token'    // Obtained from Developer Dashboard
});



And also your salesforce credentials here

conn.login("your salesforces admin login", "your password + security token", function(err, userInfo) {




Finally just zip this project using zip -r lambdaFunc.zip 

and then upload to AWS lambada.

You can then trigger this by a webhook/http trigger or cron job from cloudwatch with an expression like cron(0/1 * * * ? *).

Feel free to fork or improve
