const okta = require('@okta/okta-sdk-nodejs');
var sf = require('node-salesforce');
var conn = new sf.Connection({
  // you can change loginUrl to connect to sandbox or prerelease env.
  // loginUrl : 'https://test.salesforce.com'
});

const client = new okta.Client({
  orgUrl: 'you okta url',
  token: 'your okta api token'    // Obtained from Developer Dashboard
});




conn.login("your salesforces admin login", "your password + security token", function(err, userInfo) {
  if (err) { return console.error(err); }
  // Now you can get the access token and instance URL information.
  // Save them to establish connection next time.
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  // logged in user property
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);
  conn = new sf.Connection({
    instanceUrl : conn.instanceUrl,
    accessToken : conn.accessToken
  });
  conn.sobject("Contact")
  .find({ CreatedDate: sf.Date.TODAY }) // "fields" argument is omitted
  .execute(function(err, records) {
    records.forEach(function(element) {
      console.log(element.Email)
      const newUser = {
        profile: {
          firstName: element.FirstName,
          lastName: element.LastName,
          email: element.Email,
          login: element.Email,
        }
      };
      client.createUser(newUser)
      .then(user => {
        console.log('Created user', user);
      }).catch((err)=>{
        console.log(err); // 'foo error'
      });

    });
  });

});
