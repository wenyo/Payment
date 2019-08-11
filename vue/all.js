const wrap = new Vue({
    el: '.wrap',
    data:{
        iOrderStep: 1,
        bSelectCommodityWhite: false,
        iSelectCommodity: -1,
        bSelectPaymentWhite: false,
        iSelectPayment: -1,
        vCommodity: [
            {
                'unselect' : './img/photo_3hr_unselected.svg',
                'selectW' : './img/photo_3hr_selected-w.svg',
                'selectB' : './img/photo_3hr_selected-b.svg',
                'bHover' : false
            },
            {
                'unselect' : './img/photo_24hr_unselected.svg',
                'selectW' : './img/photo_24hr_selected-w.svg',
                'selectB' : './img/photo_24hr_selected-b.svg',
                'bHover' : false
            },
            {
                'unselect' : './img/photo_30days_unselected.svg',
                'selectW' : './img/photo_30days_selected-w.svg',
                'selectB' : './img/photo_30days_selected-b.svg',
                'bHover' : false
            },
            {
                'unselect' : './img/photo_90days_unselected.svg',
                'selectW' : './img/photo_90days_selected-w.svg',
                'selectB' : './img/photo_90days_selected-b.svg',
                'bHover' : false
            }
        ],
        vPayment: [
            {
                'unselect' : './img/icon_credit card.svg',
                'selectW' : './img/icon_credit card-w.svg',
                'payment' : '信用卡',
                'bHover': false 
            },
            {
                'unselect' : './img/icon_atm.svg',
                'selectW' : './img/icon_atm-w.svg',
                'payment' : '銀行轉帳',
                'bHover': false 
            },
            {
                'unselect' : './img/icon_paypal.svg',
                'selectW' : './img/icon_paypal-w.svg',
                'payment' : '',
                'bHover': false 
            },
            {
                'unselect' : './img/icon_barcode.svg',
                'selectW' : './img/icon_barcode-w.svg',
                'payment' : '超商繳費',
                'bHover': false 
            },
        ],

        sCreditCardCode: '',
        sWarnWord: '',
    },
    methods:{
        chooseCommodity: function($index){
            const sTicketLi = this.$refs.sTicketLi;
            for(let key in sTicketLi){
                sTicketLi[key].classList.remove('active')
            }
            if(this.iSelectCommodity == $index){
                this.bSelectCommodityWhite = !this.bSelectCommodityWhite;
            }else{
                this.iSelectCommodity = $index;
                this.bSelectCommodityWhite = true;
                sTicketLi[$index].classList.add('active');
            }
        },
        choosePayment: function($index){
            const payment = this.$refs.payment;
            for(let key in payment){
                payment[key].classList.remove('active')
            }
            if(this.iSelectPayment == $index){
                this.bSelectPaymentWhite = !this.bSelectPaymentWhite;
            }else{
                this.iSelectPayment = $index;
                this.bSelectPaymentWhite = true;
                payment[$index].classList.add('active');
            }
        },
        addContentClass: function(){
            const paymentClass = this.$refs.paymentClass.classList
            if(this.iOrderStep == 2){
                paymentClass.add('paymentInfo');
            }else{
                paymentClass.remove('paymentInfo');
            }
        },
        addLineInCode: function(){
            let result = '';
            let vCode = this.sCreditCardCode.split('');
            for(let ikey in vCode){
                if(ikey%5 == 4){
                    if(vCode[ikey] !== '-'){
                        vCode.splice(ikey, 0, '-');
                    }
                }
            }
            for(let ikey in vCode){
                result += vCode[ikey];
            }
            this.sCreditCardCode = result;
        },
        checkCode: function(e){
            console.log(e.code.substr(0,5))
            if(e.code.substr(0,5) !== 'Digit'){
                console.log('wrong')
                this.sWarnWord = "wrong"
            }
            this.addLineInCode()
        }
    }
})