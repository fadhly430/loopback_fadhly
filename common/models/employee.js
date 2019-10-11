'use strict';

module.exports = function(employee) {
    employee.getEmployeeBystatus = function(statuss, callback) {
        new Promise(function(resolve, reject) {
                // find name
          employee.find({where: {status: {like: statuss}}}, function(err, result) {
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
      employee.remoteMethod(
            'getEmployeeBystatus',
        {
          description: 'get employee by status',
          accepts: [
                    {arg: 'STATUS', type: 'string'},
          ],
          returns: {
            arg: 'res', type: 'object', root: true,
          },
          http: {path: '/getEmployeeBystatus', verb: 'get'},
        }
        );
};
