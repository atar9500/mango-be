const UsersBucketName = '${env:SERVICE}-users-bucket';

export const UsersBucket = {
  Type: 'AWS::S3::Bucket',
  Properties: {
    BucketName: UsersBucketName,
  },
};

export const UsersBucketPolicy = {
  Type: 'AWS::S3::BucketPolicy',
  DeletionPolicy: 'Retain',
  Properties: {
    Bucket: {Ref: 'UsersBucket'},
    PolicyDocument: {
      Statement: [
        {
          Sid: 'S3WritePermissions',
          Action: ['s3:PutObject', 's3:GetObject', 's3:DeleteObject'],
          Resource: [
            `arn:aws:s3:::${UsersBucketName}`,
            `arn:aws:s3:::${UsersBucketName}/*`,
          ],
          Effect: 'Allow',
          Principal: {
            AWS: [
              {
                'Fn::Join': [
                  ':',
                  ['arn:aws:iam:', {Ref: 'AWS::AccountId'}, 'root'],
                ],
              },
            ],
          },
        },
      ],
    },
  },
};
