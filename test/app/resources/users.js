module.exports = {
  schema: {
    label: "String",
    url: "String"
  },
  schema_options:  {
    middleware: function( schema ) {
      schema.post('init', function ( doc ) {
        console.log('%s has been initialized from the db', doc._id);
      });
    }
  }
}
