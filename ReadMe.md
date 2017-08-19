## Configure secret keys

### Encrypt keys
- tar cvf secrets.tar ./server/config/keys.prod.js ./server/config/keys.dev.js
- travis encrypt-file secrets.tar
