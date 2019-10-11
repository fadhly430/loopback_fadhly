'use strict';

module.exports = function(project) {
    project.getProjectbyprojectname = function(projects, callback) {
        new Promise(function(resolve, reject) {
                // find name
          project.find({where: {nama_project: {like: projects}}}, function(err, result) {
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
      project.remoteMethod(
            'getProjectbyprojectname',
        {
          description: 'get project by nama',
          accepts: [
                    {arg: 'nama', type: 'string'},
          ],
          returns: {
            arg: 'res', type: 'object', root: true,
          },
          http: {path: '/getProjectbyprojectname', verb: 'get'},
        }
        );
};
