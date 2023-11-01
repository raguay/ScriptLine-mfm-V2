const ScriptLine = {
  extMan: null,
  fs: null,
  init: function(extManager) {
    ScriptLine.extMan = extManager;
    ScriptLine.fs = ScriptLine.extMan.getLocalFS();

    //
    // Add to the directory change listener
    //
    ScriptLine.extMan.getExtCommand('addDirectoryListener').command(ScriptLine.DirListener);
  },
  installKeyMaps: function() {
  },
  DirListener: async function(dir) {
    console.log("ScriptLine: ", dir);
    await ScriptLine.fs.runCommandLine(`wget -O /dev/null -q -nv --method=PUT --body-data="{\"wd\": \"${dir}\"}" --header='Content-Type:application/json' 'http://localhost:9978/api/wd' 2>&1 > /dev/null`, [], (err, _) => {
      if (err) {
        console.log("ScriptLine: ", err);
      }
    }, null);
  }
};
return (ScriptLine);

