exports.setUserRole = async (base, myGuild) => {

    base('Members').select({
        maxRecords: 1000,
        filterByFormula: "NOT({Discord-Status} = '')",
        view: "NewMembers"
    }).eachPage(function page(records, fetchNextPage) {

        records.forEach(async function(record) {
            

        });
         


        fetchNextPage();
    });


};