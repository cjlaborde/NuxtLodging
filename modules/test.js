export default function(moduleOptions) {
    // console.log(moduleOptions.message);
    // console.log(this);
    this.addPlugin('plugins/test.js');
    this.options.message2 = 'message from a module';
}