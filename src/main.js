import "./css/index.css"
import IMask from 'imask';

const CorBg1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")
const CorBg2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function SetCardType(tipo){
    const colors = {
        "visa": ["#2D57F2","#436D99"],
        "mastercard": ["#C69347", "#DF6F29"],
        "padrao": ["black", "gray"],
    }
    CorBg1.setAttribute("fill", colors[tipo][0])
    CorBg2.setAttribute("fill", colors[tipo][1])
    ccLogo.setAttribute("src", `cc-${tipo}.svg`)
}

const CVC = document.querySelector("#security-code")
var MaskCVC = {
    mask : '0000'
}
var mask = IMask(CVC, MaskCVC);  

const expirationDate = document.querySelector("#expiration-date")
var MaskExpirationDate = {
    mask : 'MM/YY',
    blocks : {
        MM : {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12
        },
        YY: {
            mask: IMask.MaskedRange,
            from: String(new Date().getFullYear()).slice(2),
            to: String(new Date().getFullYear()+ 10).slice(2)
        }
    }
}
const expirationDateMasked = IMask(expirationDate,MaskExpirationDate)

//visa 4^\d{0,15}
//mastercard (^5\d[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}

const cardNumber = document.querySelector("#card-number")
const cardNumberPattern = {
    mask : [
        {
            mask : "0000 0000 0000 0000",
            regex: /^4\d{0,15}/,
            cardType: "visa"
        },
        {
            mask : "0000 0000 0000 0000",
            regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
            cardType: "mastercard"
        },
        {
            mask : "0000 0000 0000 0000",
            cardType: "default "
        },
    ],
    dispatch: function (appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, "")
        const foundMask = dynamicMasked.compiledMasks.find(function (item) {
          return number.match(item.regex)
        })
        console.log(foundMask)
        return foundMask
      },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPattern)




