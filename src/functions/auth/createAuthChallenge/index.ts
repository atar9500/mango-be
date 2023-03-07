import handlerPath from '~/shared/utils/handlerPath';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  policies: [
    {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Action: ['mobiletargeting:*', 'sns:*'],
          Resource: '*',
        },
      ],
    },
  ],
};
