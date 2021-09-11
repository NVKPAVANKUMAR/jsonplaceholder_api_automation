module.exports = {
  spec: ['./spec/*'],
  reporter: 'mochawesome',
  'reporter-option': [
    'overwrite=true',
    'reportTitle=JSONPlaceholder API Tests',
    'showPassed=true',
    'timestamp=default',
    'html=true',
    'json=false',
    'charts=true',
    'recursive=true',
  ],
  timeout: 7000,
};
