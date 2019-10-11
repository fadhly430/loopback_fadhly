'use strict';

module.exports = function(owner) {
    owner.getOwnerByumur = function(umurs, callback) {
        new Promise(function(resolve, reject) {
                // find name
          admin.find({where: {umur: {like: umurs}}}, function(err, result) {
            if (err) reject(err);
            if (result === null) {
              err = new Error('Tidak Ditemukan');
              err.statusCode = 404;
              reject(err);
            }
            resolve(result);
          });
        }).then(function(res) {
          if (!res) callback(err);
          return callback(null, res[0]);
        }).catch(function(err) {
          callback(err);
        });
      };
      owner.remoteMethod(
            'getOwnerByumur',
        {
          description: 'get Owner by umur',
          accepts: [
                    {arg: 'UMUR', type: 'string'},
          ],
          returns: {
            arg: 'res', type: 'object', root: true,
          },
          http: {path: '/getOwnerByumur', verb: 'get'},
        }
        );
};