const { exec } = require('child_process');

function run(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, { shell: 'cmd.exe' }, (err, stdout) => {
      if (err) return reject(err);
      resolve(stdout);
    });
  });
}

(async () => {
  try {
    const status = await run('warp-cli status');

    if (status.includes('Connected')) {
      await run('warp-cli disconnect');
      console.log('❌ WARP OFF');
    } else {
      await run('warp-cli connect');
      console.log('✅ WARP ON');
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
})();
