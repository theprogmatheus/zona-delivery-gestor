const PrinterModel = (order) => {

    return {
        data: [
            {
                type: 'image',
                url: 'https://static-images.ifood.com.br/image/upload/t_medium/logosgde/9bf7595f-5b62-4409-bbb6-285a55e48bcc/202207161813_QXWg_i.jpg',
                position: 'center',                                 
                width: 'auto',                                           // width of image in px; default: auto
                height: '230px',                                          // width of image in px; default: 50 or '50px'
            }, {
                type: 'text',                                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table
                value: '#' + order.id,
                style: { fontWeight: "700", textAlign: 'center', fontSize: "20px" }
            }, {
                type: 'qrCode',
                value: 'https://github.com/Hubertformin/electron-pos-printer',
                height: 55,
                width: 55,
                style: { margin: '10 20px 20 20px' }
            }, {
                type: 'text',                       // 'text' | 'barCode' | 'qrCode' | 'image' | 'table'
                value: 'Agradecemos a Preferência',
                style: { textDecoration: "underline", fontSize: "12px", textAlign: "center" }
            },


            {
                type: 'table',
                // style the table
                style: { border: '1px solid #ddd' },
                // list of the columns to be rendered in the table header
                tableHeader: ['Produto', 'Quantidade', 'Preço'],
                // multi dimensional array depicting the rows and columns of the table body
                tableBody: [
                    ['Macarrão', 1, 'R$3,89'],
                    ['Dog', 4],
                    ['Horse', 12],
                    ['Pig', 4],
                ],
                // list of columns to be rendered in the table footer
                tableFooter: ['Animal', 'Age'],
                // custom style for the table header
                tableHeaderStyle: { backgroundColor: '#000', color: 'white' },
                // custom style for the table body
                tableBodyStyle: { 'border': '0.5px solid #ddd' },
                // custom style for the table footer
                tableFooterStyle: { backgroundColor: '#000', color: 'white' },
            },

            {
                type: 'table',
                // style the table
                style: { border: '1px solid #ddd' },
                // list of the columns to be rendered in the table header
                tableHeader: ['Animal', 'Age'],
                // multi dimensional array depicting the rows and columns of the table body
                tableBody: [
                    ['Cat', 2],
                    ['Dog', 4],
                    ['Horse', 12],
                    ['Pig', 4],
                ],
                // list of columns to be rendered in the table footer
                tableFooter: ['Animal', 'Age'],
                // custom style for the table header
                tableHeaderStyle: { backgroundColor: '#000', color: 'white' },
                // custom style for the table body
                tableBodyStyle: { 'border': '0.5px solid #ddd' },
                // custom style for the table footer
                tableFooterStyle: { backgroundColor: '#000', color: 'white' },
            }, {
                type: 'table',
                style: { border: '1px solid #ddd' },             // style the table
                // list of the columns to be rendered in the table header
                tableHeader: [{ type: 'text', value: 'People' }, { type: 'text', value: 'IMAGE OF ANIMAL' }],
                // multi-dimensional array depicting the rows and columns of the table body
                tableBody: [
                    [{ type: 'text', value: 'Marcus' }, { type: 'image', url: 'https://randomuser.me/api/portraits/men/43.jpg' }],
                    [{ type: 'text', value: 'Boris' }, { type: 'image', url: 'https://randomuser.me/api/portraits/men/41.jpg' }],
                    [{ type: 'text', value: 'Andrew' }, { type: 'image', url: 'https://randomuser.me/api/portraits/men/23.jpg' }],
                    [{ type: 'text', value: 'Tyresse' }, { type: 'image', url: 'https://randomuser.me/api/portraits/men/53.jpg' }],
                ],
                // list of columns to be rendered in the table footer
                tableFooter: [{ type: 'text', value: 'People' }, 'Image'],
                // custom style for the table header
                tableHeaderStyle: { backgroundColor: 'red', color: 'white' },
                // custom style for the table body
                tableBodyStyle: { 'border': '0.5px solid #ddd' },
                // custom style for the table footer
                tableFooterStyle: { backgroundColor: '#000', color: 'white' },
            },
        ]
    }


}

export default PrinterModel;