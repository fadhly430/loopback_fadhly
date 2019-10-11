'use strict';

module.exports = function(admin) {
    admin.getadminBylevel = function(levels, callback) {
        new Promise(function(resolve, reject) {
                // find name
          admin.find({where: {level: {like: levels}}}, function(err, result) {
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
      admin.remoteMethod(
            'getadminBylevel',
        {
          description: 'get admin by level',
          accepts: [
                    {arg: 'LEVEL', type: 'string'},
          ],
          returns: {
            arg: 'res', type: 'object', root: true,
          },
          http: {path: '/getAdminBylevel', verb: 'get'},
        }
        );
};
