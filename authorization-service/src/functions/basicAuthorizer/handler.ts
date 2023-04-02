const basicAuthorizer = async (event) => {
  try {
    if (event['type'] != 'TOKEN') 
      throw console.error('Not token');

    const authorizationToken = event.authorizationToken;
    const encodedCreds = authorizationToken.split(' ')[1];
    const buff = Buffer.from(encodedCreds, 'base64');
    const plainCreds = buff.toString('utf-8').split(':');
    const username = plainCreds[0];
    const password = plainCreds[1];

    const storedUsedPassword = process.env[username];
    const effect = !storedUsedPassword || storedUsedPassword != password ? 'Deny' : 'Allow';

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);
    
    return policy;
  } 
  catch (error) {
    console.log('Authorizer error ' + error);
  }
};

const generatePolicy = (principalId, resource, effect = 'Allow') => {
  return {
    principalId: principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  }

}

export const main = basicAuthorizer;
