const { exec } = require('child_process');
const { promisify } = require('util');

const execPromise = promisify(exec);

const runCodeMaatSummary = async () => {
  try {
    const path = await execPromise('pwd');
    const { stdout, stderr } = await execPromise(`docker run -v ${path?.stdout.replace('\n', '')}/uploads:/data code-maat-app -l /data/logfile.log -c git2 -a summary`);
    console.log('Command executed successfully');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    return stdout
  } catch (error) {
    console.error('Command execution failed:', error);
  }
}

module.exports = {
  runCodeMaatSummary
}