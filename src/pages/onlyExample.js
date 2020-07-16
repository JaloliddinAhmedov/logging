import React from 'react';
import '../style/style.css'

let obj = {
    0: { id: "72eeb26a-4eed-403e-ae9d-707ccb980d8c", chain_id: null, message: null, message_short: null, type_id: 0 },
    1: { id: "48f9018d-1ec3-4ebe-914e-7e24563a406d", chain_id: null, message: "Sync completed", message_short: "Sync completed", type_id: 130 },
    2: { id: "5856cae9-2292-4237-bd2c-a024af1eb265", chain_id: null, message: null, message_short: null, type_id: 0 },
    3: { id: "3393e51f-b40a-4336-88f9-6989e771e985", chain_id: null, message: null, message_short: null, type_id: 0 },
    4: { id: "3a91a4b3-0464-4a58-8917-01bcb855af37", chain_id: null, message: "Login completed", message_short: "Login completed", type_id: 130 },
    5: { id: "9bfff45a-d88c-4c3e-a8e3-35110c8cb625", chain_id: null, message: null, message_short: null, type_id: 0 },
    6: { id: "92c334b1-dd89-4b92-b644-11b5c97e1883", chain_id: null, message: "Sync completed", message_short: "Sync completed", type_id: 130 },
    7: { id: "2b262cf9-88ce-4a76-b571-2194c7533416", chain_id: null, message: null, message_short: null, type_id: 0 },
    8: { id: "ea825308-7025-4f9f-8fd6-caa0b9bbdb61", chain_id: null, message: "Пустой заголовок авторизации", message_short: "Пустой заголовок авторизации", type_id: 0 },
    9: { id: "8c319465-a051-468b-8014-e18280ea1854", chain_id: null, message: "Пустой заголовок авторизации", message_short: "Пустой заголовок авторизации", type_id: 0 },
    10: { id: "e21b8755-5718-47f5-9ea5-58f8fae255ec", chain_id: null, message: null, message_short: null, type_id: 0 },
    11: { id: "f5b47693-6d5b-4f98-80d6-184ee962e89c", chain_id: null, message: "Authorization header cannot be blank!", message_short: "Authorization header cannot be blank!", type_id: 0 },
    12: { id: "66bf1b7e-3b09-4774-8359-4629ef361ca8", chain_id: null, message: "Login completed", message_short: "Login completed", type_id: 130 },
    13: { id: "82124e4a-8b86-4d2c-a6cf-72b22439bdbe", chain_id: null, message: null, message_short: null, type_id: 0 },
    14: { id: "e7eddc6c-09f2-453f-9387-a18346856c2e", chain_id: null, message: null, message_short: null, type_id: 0 },
    15: { id: "9e3e2ec0-73fe-47ba-95bf-61798d286fa2", chain_id: null, message: null, message_short: null, type_id: 0 },
    16: { id: "c0707f5a-093a-429c-b333-bd71760615f0", chain_id: null, message: null, message_short: null, type_id: 0 },
    17: { id: "9dc0da93-94fe-4bc9-a110-808698a8c924", chain_id: null, message: null, message_short: null, type_id: 0 },
    18: { id: "1bcf0f3c-1c3e-4d9f-888c-3c80df1a3f8c", chain_id: null, message: null, message_short: null, type_id: 0 },
    19: { id: "2e45a935-197d-4276-a259-3f14bcaec38d", chain_id: null, message: null, message_short: null, type_id: 0 },
    20: { id: "3b60e0e5-2c4a-498d-a848-391e4a4cfc31", chain_id: null, message: null, message_short: null, type_id: 0 },
    21: { id: "b27195f4-be57-41aa-bead-a8a27cb7af52", chain_id: null, message: null, message_short: null, type_id: 0 },
    22: { id: "5cf75aad-d575-4813-bde3-a9cf66d31fc6", chain_id: null, message: "404 not found", message_short: "404 not found", type_id: 0 },
    23: { id: "142b04e2-3a78-4813-af45-f2f0a0fd4c05", chain_id: null, message: "getWriter() has already been called for this response", message_short: "getWriter() has already been called for ", type_id: 0 },
    24: { id: "b513b94c-4093-49a2-94d4-d895d9836359", chain_id: null, message: null, message_short: null, type_id: 0 },
    25: { id: "88300e08-d2dc-46ba-be48-d115298cbb78", chain_id: null, message: null, message_short: null, type_id: 0 },
    26: { id: "b45eab1a-2f03-45c1-b5ba-bfd622426f84", chain_id: null, message: null, message_short: null, type_id: 0 },
    27: { id: "8a46b060-0dd4-4f82-a0c0-db6400c9d8a0", chain_id: null, message: null, message_short: null, type_id: 0 },
    28: { id: "1e5b2c4b-2f5e-4215-9a8d-85d348d62d39", chain_id: null, message: "Login completed", message_short: "Login completed", type_id: 130 },
    29: { id: "00c56564-bdd7-4105-b20c-5b18d722a719", chain_id: null, message: null, message_short: null, type_id: 0 },
    30: { id: "1b964437-06dd-4159-a8e8-473c57a8bd16", chain_id: null, message: null, message_short: null, type_id: 0 },
    31: { id: "126f3551-ce43-4cf0-b449-4c324fbf413c", chain_id: null, message: null, message_short: null, type_id: 0 },
    32: { id: "52479026-5a7e-430c-b18a-423eef5d3a5f", chain_id: null, message: null, message_short: null, type_id: 0 },
    33: { id: "55fcaf91-bdf1-45ea-a1b4-e8ef9cee9345", chain_id: null, message: null, message_short: null, type_id: 0 },
    34: { id: "b6cfa4d2-e290-49f2-899a-b54c07580679", chain_id: null, message: null, message_short: null, type_id: 0 },
    35: { id: "4bdea780-3857-4e29-8af2-98feaf29d876", chain_id: null, message: "404 not found", message_short: "404 not found", type_id: 0 },
    36: { id: "c2726065-1eea-4a48-8756-18b5af49d7af", chain_id: null, message: "getWriter() has already been called for this response", message_short: "getWriter() has already been called for ", type_id: 0 },
    37: { id: "2195040c-a43b-46c5-a7c0-c2c9f99c7c38", chain_id: null, message: null, message_short: null, type_id: 0 },
    38: { id: "9ef7124c-e324-485c-b507-7df8790d25c7", chain_id: null, message: null, message_short: null, type_id: 0 },
    39: { id: "2ecc3946-3a8f-4f19-a1b5-c40be3acdb57", chain_id: null, message: null, message_short: null, type_id: 0 },
    40: { id: "236ff84d-0cae-4101-a48f-856bcb01b21c", chain_id: null, message: null, message_short: null, type_id: 0 },
    41: { id: "ddb1fa8f-1885-4962-8375-2e9358ba730a", chain_id: null, message: null, message_short: null, type_id: 0 },
    42: { id: "277247eb-6a51-4a41-9c90-c4f6317cad85", chain_id: null, message: null, message_short: null, type_id: 0 },
    43: { id: "39adeed5-0bac-406f-b236-c988c0285150", chain_id: null, message: null, message_short: null, type_id: 0 },
    44: { id: "89e01211-8695-4270-865a-ca6f6be38e42", chain_id: null, message: null, message_short: null, type_id: 0 },
    45: { id: "7476d550-7604-4fe0-ac0f-2b2019554f67", chain_id: null, message: null, message_short: null, type_id: 0 },
    46: { id: "90537e9a-7964-4db3-acb6-fc8aadf74448", chain_id: null, message: null, message_short: null, type_id: 0 },
    47: { id: "449a2f28-36cc-4146-bdbf-16134ef3646c", chain_id: null, message: null, message_short: null, type_id: 0 },
    48: { id: "50031795-22cf-4502-9fd4-1e602436c748", chain_id: null, message: null, message_short: null, type_id: 0 },
    49: { id: "885b630b-c78a-4b77-9433-afe1890325aa", chain_id: null, message: null, message_short: null, type_id: 0 },
    50: { id: "8689cb66-f6e1-439f-b28a-8b8cd8e11824", chain_id: null, message: null, message_short: null, type_id: 0 },
    51: { id: "21a7bf61-bf70-4dab-9b2a-5a220212243b", chain_id: null, message: null, message_short: null, type_id: 0 },
    52: { id: "83ce6130-8540-4374-ab7d-62cdbc59817f", chain_id: null, message: null, message_short: null, type_id: 0 },
    53: { id: "4ac4354f-bc79-4d13-9d3d-0344acc0fba9", chain_id: null, message: null, message_short: null, type_id: 0 },
    54: { id: "5a35ffc7-d61e-49ce-ac29-62cf4a86107c", chain_id: null, message: null, message_short: null, type_id: 0 },
    55: { id: "9a60c890-6976-4abc-9ac4-e86d6eb87fa2", chain_id: null, message: null, message_short: null, type_id: 0 },
    56: { id: "cb13f3dc-87ad-4a91-b687-9d1c812cfd60", chain_id: null, message: null, message_short: null, type_id: 0 },
    57: { id: "bcd06ca0-8a1a-4a23-8f68-0395b67adfc6", chain_id: null, message: null, message_short: null, type_id: 0 },
    58: { id: "698eaba5-8980-4bfa-b7f9-6145652db241", chain_id: null, message: null, message_short: null, type_id: 0 },
    59: { id: "7c5d7cb3-5765-4a55-b8dc-2ea0edd74985", chain_id: null, message: null, message_short: null, type_id: 0 },
    60: { id: "916cbac9-0817-4ffb-af04-df9b54c71f53", chain_id: null, message: null, message_short: null, type_id: 0 },
    61: { id: "f35a1616-bc57-4afb-a26b-e7d5c9f3234a", chain_id: null, message: null, message_short: null, type_id: 0 },
    62: { id: "0f85b2a0-128f-4153-b2f8-00f1e6c9b63d", chain_id: null, message: null, message_short: null, type_id: 0 },
    63: { id: "16bdc8e1-03db-4b78-b605-c309499dd51a", chain_id: null, message: null, message_short: null, type_id: 0 },
    64: { id: "75f6547b-d566-4314-8682-79ff76fbfd73", chain_id: null, message: null, message_short: null, type_id: 0 },
    65: { id: "250a2633-1eb7-4b77-ad1c-7fd2480411b9", chain_id: null, message: "Login completed", message_short: "Login completed", type_id: 130 },
    66: { id: "6c0f7559-9e56-48e3-a3b7-e204ec9b0777", chain_id: null, message: null, message_short: null, type_id: 0 },
    67: { id: "e460f4b2-bc69-48c2-8199-562c72f8bb00", chain_id: null, message: null, message_short: null, type_id: 0 },
    68: { id: "6159edbb-2253-427d-9c34-414ef82b14a5", chain_id: null, message: null, message_short: null, type_id: 0 },
    69: { id: "16f428e3-49b8-4af2-a199-d008bdc07626", chain_id: null, message: null, message_short: null, type_id: 0 },
    70: { id: "e02f5485-f1d1-4e6d-a1f6-0b1ee2229754", chain_id: null, message: "404 not found", message_short: "404 not found", type_id: 0 },
    71: { id: "9b218771-2b4b-48b6-98bf-dfc00c68bcad", chain_id: null, message: "getWriter() has already been called for this response", message_short: "getWriter() has already been called for ", type_id: 0 },
    72: { id: "150ccb1d-92fb-4196-836f-4e0c16c8975c", chain_id: null, message: null, message_short: null, type_id: 0 },
    73: { id: "c29a9acf-d4f4-4d31-b4b6-6d2578734e83", chain_id: null, message: null, message_short: null, type_id: 0 },
    74: { id: "8f60036c-9469-4d9a-9209-931c2d9fcec7", chain_id: null, message: "Sync completed", message_short: "Sync completed", type_id: 130 },
    75: { id: "369f0f9f-3114-4f6d-bd5d-4faf8f4cbf1e", chain_id: null, message: "Login completed", message_short: "Login completed", type_id: 130 },
    76: { id: "9e506e85-a5d7-422a-9716-c96b04bfcfdd", chain_id: null, message: null, message_short: null, type_id: 0 },
    77: { id: "6182dbf7-1fa6-4159-b983-3a2940572ff5", chain_id: null, message: null, message_short: null, type_id: 0 },
    78: { id: "eed7b76e-77bd-49fb-a49d-1fc326637408", chain_id: null, message: null, message_short: null, type_id: 0 },
    79: { id: "e7306218-ed6c-4e5f-91bc-acc119eefb00", chain_id: null, message: null, message_short: null, type_id: 0 },
    80: { id: "f1b5a560-c816-4ff3-b02d-bebdc5486b21", chain_id: null, message: null, message_short: null, type_id: 0 },
    81: { id: "24388675-98f1-43b6-9f48-38586dd80055", chain_id: null, message: null, message_short: null, type_id: 0 },
    82: { id: "f48182dd-8139-4b95-900d-730c5f228c0a", chain_id: null, message: null, message_short: null, type_id: 0 },
    83: { id: "c2bced15-af8e-440f-8a34-f16e02d7dea3", chain_id: null, message: null, message_short: null, type_id: 0 },
    84: { id: "cf64243b-960e-4a03-861f-f16e92df1119", chain_id: null, message: "null", message_short: "null", type_id: 0 },
    85: { id: "37c3c84e-4b15-42fa-a7da-f51b0236a12b", chain_id: null, message: "null", message_short: "null", type_id: 0 },
    86: { id: "d4430833-50b9-4578-ae70-486aac22be72", chain_id: null, message: "null", message_short: "null", type_id: 0 },
    87: { id: "86518216-47e7-4745-90d5-c6b1e0f88bea", chain_id: null, message: "null", message_short: "null", type_id: 0 },
    88: { id: "009ee5e7-4714-4139-9a6e-25f00f59aaaa", chain_id: null, message: "null", message_short: "null", type_id: 0 },
    89: { id: "8d66a8ab-4181-429f-b4be-326e05475bcb", chain_id: null, message: "null", message_short: "null", type_id: 0 },
    90: { id: "e34465ce-140e-4c4f-a45b-cc803369c033", chain_id: null, message: "Sync completed", message_short: "Sync completed", type_id: 130 },
    91: { id: "c0bd2d1a-4dd1-4fd1-a39a-35238ee9d0b0", chain_id: null, message: "Login completed", message_short: "Login completed", type_id: 130 },
    92: { id: "f85b1707-ac66-4df6-b635-559a7992521f", chain_id: null, message: "Login completed", message_short: "Login completed", type_id: 130 },
    93: { id: "d71f317a-9cfc-470d-82e3-0738d8f1e1de", chain_id: null, message: "JSON parse error: Cannot deserialize value of type….model.ReqStatementAllSumOfMerchant", message_short: "JSON parse error: Cannot deserialize val", type_id: 0 },
    94: { id: "99537dc5-3a08-4233-b033-c911bc879c4d", chain_id: null, message: "JSON parse error: Cannot deserialize value of type….model.ReqStatementAllSumOfMerchant", message_short: "JSON parse error: Cannot deserialize val", type_id: 0 },
    95: { id: "026755d3-e167-4855-9c5f-e3bf94e0815c", chain_id: null, message: "JSON parse error: Cannot deserialize value of type….model.ReqStatementAllSumOfMerchant", message_short: "JSON parse error: Cannot deserialize val", type_id: 0 },
    96: { id: "f3e3b791-ed2f-49ed-af34-777d34ff78bd", chain_id: "cc80cc5e-f8e3-4219-bcc5-8756aa7484db", message: "Неправильный логин или пароль", message_short: "Неправильный логин или пароль", type_id: 130 },
    97: { id: "cc80cc5e-f8e3-4219-bcc5-8756aa7484db", chain_id: null, message: "Неправильный логин или пароль", message_short: "Неправильный логин или пароль", type_id: 0 },
    98: { id: "dc50b616-07ed-4ea1-aa8e-e5e078cdc12d", chain_id: null, message: "Login completed", message_short: "Login completed", type_id: 130 },
    99: { id: "b36658d8-9f2f-437d-8da3-7741cb43a78f", chain_id: null, message: "null", message_short: "null", type_id: 0 }
}

export default class OnlyExample extends React.Component {

    constructor(props){
        super(props);
        this.myRef = React.createRef();
    }

    componentDidMount(){
        this.myRef.current.focus();
    }

    render() {

        return (
        <div>
            <input ref={this.myRef} type='text'/>{React.version}
        </div>
        )
    }
}