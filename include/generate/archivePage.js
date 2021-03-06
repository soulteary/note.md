'use strict';

const archive = require('story-generate-archive');
const postApi = require('story-utils').posts;
const path = require('path');

/** BLOG POSTS DIR **/
const postsRootDir = path.resolve(__dirname, '../../content/posts');
const archiveRootDir = path.resolve(__dirname, '../../content/archive');

module.exports = function() {
  return postApi.scanDir(postsRootDir, ['.DS_Store', '/posts', 'posts/README.md'])
      .then(postApi.sortOutPath)      // sort out path which is needed.
      .then(function(pathData) {      // mkdirs for archive
        const option = {
          postsRootDir: postsRootDir,
          archiveRootDir: archiveRootDir
        };
        return archive.prepareDirs(pathData.dir, option)
            .then(archive.generate(pathData.dir, option));
      })
      .catch(function(e) {
        console.log('err', e);
      });
};
