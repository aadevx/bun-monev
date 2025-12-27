$.extend( true, $.fn.dataTable.defaults, {
    processing: true,
    serverSide: true,
    language : {
        processing: "Sedang proses...",
        sLengthMenu: "Tampilan _MENU_ data",
        sZeroRecords: "Tidak ditemukan data yang sesuai",
        sInfo: "Tampilan _START_ sampai _END_ dari _TOTAL_ data",
        sInfoEmpty: "Tampilan 0 hingga 0 dari 0 data",
        sInfoFiltered: "(disaring dari _MAX_ entri keseluruhan)",
        sInfoPostFix: "",
        sSearch: "Cari:",
        buttons: {
            pageLength: {
                _: 'Tampilan %d data'
            }
        }
    },
    lengthMenu: [[10, 20, 25, 50, -1], [10, 20, 25, 50, 'All']],
    layout: {
        topStart: {
            buttons: [{
                extend: 'print',
                exportOptions: {
                    columns: ':visible'
                }
            }, {
                extend: 'excel',
                exportOptions: {
                    columns: ':visible'
                }
            }, {
                extend: 'pdfHtml5', text: 'PDF',
                orientation: 'landscape',
                pageSize: 'A3',
                exportOptions: {
                    columns: ':visible'
                }
            }, 'pageLength', { extend: 'colvis', text: 'Show/Hide column' }]
        }
    },
})