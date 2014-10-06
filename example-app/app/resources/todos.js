module.exports = {
  schema: {
    label: String,
    is_done: Boolean
  },
  // schema_options:  {
  //   onInit: function( model ) {
  //     model.create({
  //       label: 'test',
  //       is_done: false
  //     });
  //   },
  //   middleware: function( schema ) {
  //     schema.post('init', function ( doc ) {
  //       console.log('%s has been initialized from the db', doc._id);
  //     });
  //   }
  // }
}
