import {CognitoUserPoolClient} from './cognitoUserPoolClient';
import {CognitoUserPool, CongitoUserPoolIAMRole} from './cognitoUserPool';

export const cognitoResources = {CognitoUserPoolClient, CognitoUserPool};

export const cognitoIAMRoles = [CongitoUserPoolIAMRole];
