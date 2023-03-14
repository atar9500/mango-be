const NotesBucketName = '${env:SERVICE}-notes-bucket';

export const NotesBucket = {
  Type: 'AWS::S3::Bucket',
  Properties: {
    BucketName: NotesBucketName,
  },
};

export const NotesBucketPolicy = {
  Type: 'AWS::S3::BucketPolicy',
  DeletionPolicy: 'Retain',
  Properties: {
    Bucket: {Ref: 'NotesBucket'},
    PolicyDocument: {
      Statement: [
        {
          Action: ['s3:PutObject', 's3:GetObject', 's3:DeleteObject'],
          Resource: [
            `arn:aws:s3:::${NotesBucketName}`,
            `arn:aws:s3:::${NotesBucketName}/*`,
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
