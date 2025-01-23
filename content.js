/********************************************************
 * content.js - KTO (Kambi) - Filtra apenas "Simples" 
 *               Ganha (won) ou Perdida (lost)
 *               + Mapeamento stake -> tipster/sport
 *               + CSV com 20 colunas
 ********************************************************/

// -------------------------------------------------------
// 1) Objeto de mapeamento stake -> { tipster, sport }
//    Ajuste conforme suas necessidades. 
//    Exemplo mínimo (adicionar todas as suas stakes):
// -------------------------------------------------------
const stakeToTipster = {
    // Mapeamentos para 'Cabreloa' - Esporte: Futebol
    '12.26': { tipster: 'Cabreloa', sport: 'Futebol' },
    '9.26':  { tipster: 'Cabreloa', sport: 'Futebol' },
    '6.01':  { tipster: 'Cabreloa', sport: 'Futebol' },
    '4.01':  { tipster: 'Cabreloa', sport: 'Futebol' },
    '3.01':  { tipster: 'Cabreloa', sport: 'Futebol' },
    '2.01':  { tipster: 'Cabreloa', sport: 'Futebol' },
    '1.01':  { tipster: 'Cabreloa', sport: 'Futebol' },

    // Mapeamentos para 'Bluzera Tips (FREE)' - Esporte: Esports
    '12.7':  { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },
    '9.7':   { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },
    '6.35':  { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },
    '4.35':  { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },
    '3.35':  { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },
    '2.35':  { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },
    '1.35':  { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },
    '1.15':  { tipster: 'Bluzera Tips (FREE)', sport: 'Esports' },

    // Mapeamentos para 'Iago Garcia Props' - Esporte: Futebol
    '12.04': { tipster: 'Iago Garcia Props', sport: 'Futebol' },
    '9.04':  { tipster: 'Iago Garcia Props', sport: 'Futebol' },
    '6.02':  { tipster: 'Iago Garcia Props', sport: 'Futebol' },
    '4.02':  { tipster: 'Iago Garcia Props', sport: 'Futebol' },
    '3.02':  { tipster: 'Iago Garcia Props', sport: 'Futebol' },
    '2.02':  { tipster: 'Iago Garcia Props', sport: 'Futebol' },
    '1.02':  { tipster: 'Iago Garcia Props', sport: 'Futebol' },
    '0.82':  { tipster: 'Iago Garcia Props', sport: 'Futebol' },

    // Mapeamentos para 'Vip Rei Milionário' - Esporte: Futebol
    '12.06': { tipster: 'Vip Rei Milionário', sport: 'Futebol' },
    '9.06':  { tipster: 'Vip Rei Milionário', sport: 'Futebol' },
    '6.03':  { tipster: 'Vip Rei Milionário', sport: 'Futebol' },
    '4.03':  { tipster: 'Vip Rei Milionário', sport: 'Futebol' },
    '3.03':  { tipster: 'Vip Rei Milionário', sport: 'Futebol' },
    '2.03':  { tipster: 'Vip Rei Milionário', sport: 'Futebol' },
    '1.03':  { tipster: 'Vip Rei Milionário', sport: 'Futebol' },
    '0.83':  { tipster: 'Vip Rei Milionário', sport: 'Futebol' },

    // Mapeamentos para 'VIP ALAVANCAGEM TIPS (VIP)' - Esporte: Futebol
    '12.08': { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },
    '9.08':  { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },
    '6.04':  { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },
    '4.04':  { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },
    '3.04':  { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },
    '2.04':  { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },
    '1.04':  { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },
    '0.84':  { tipster: 'VIP ALAVANCAGEM TIPS (VIP)', sport: 'Futebol' },

    // Mapeamentos para 'Rei das Tips Odds Alta' - Esporte: Futebol
    '12.1':  { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },
    '9.1':   { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },
    '6.05':  { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },
    '4.05':  { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },
    '3.05':  { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },
    '2.05':  { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },
    '1.05':  { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },
    '0.85':  { tipster: 'Rei das Tips Odds Alta', sport: 'Futebol' },

    // Mapeamentos para 'GreenTips Free' - Esporte: Futebol
    '12.12': { tipster: 'GreenTips Free', sport: 'Futebol' },
    '9.12':  { tipster: 'GreenTips Free', sport: 'Futebol' },
    '6.06':  { tipster: 'GreenTips Free', sport: 'Futebol' },
    '4.06':  { tipster: 'GreenTips Free', sport: 'Futebol' },
    '3.06':  { tipster: 'GreenTips Free', sport: 'Futebol' },
    '2.06':  { tipster: 'GreenTips Free', sport: 'Futebol' },
    '1.06':  { tipster: 'GreenTips Free', sport: 'Futebol' },
    '0.86':  { tipster: 'GreenTips Free', sport: 'Futebol' },

    // Mapeamentos para 'Otti Bets' - Esporte: Futebol
    '12.14': { tipster: 'Otti Bets', sport: 'Futebol' },
    '9.14':  { tipster: 'Otti Bets', sport: 'Futebol' },
    '6.07':  { tipster: 'Otti Bets', sport: 'Futebol' },
    '4.07':  { tipster: 'Otti Bets', sport: 'Futebol' },
    '3.07':  { tipster: 'Otti Bets', sport: 'Futebol' },
    '2.07':  { tipster: 'Otti Bets', sport: 'Futebol' },
    '1.07':  { tipster: 'Otti Bets', sport: 'Futebol' },
    '0.87':  { tipster: 'Otti Bets', sport: 'Futebol' },

    // Mapeamentos para 'Bingos Stk' - Esporte: Futebol
    '12.16': { tipster: 'Bingos Stk', sport: 'Futebol' },
    '9.16':  { tipster: 'Bingos Stk', sport: 'Futebol' },
    '6.08':  { tipster: 'Bingos Stk', sport: 'Futebol' },
    '4.08':  { tipster: 'Bingos Stk', sport: 'Futebol' },
    '3.08':  { tipster: 'Bingos Stk', sport: 'Futebol' },
    '2.08':  { tipster: 'Bingos Stk', sport: 'Futebol' },
    '1.08':  { tipster: 'Bingos Stk', sport: 'Futebol' },
    '0.88':  { tipster: 'Bingos Stk', sport: 'Futebol' },

    // Mapeamentos para 'STK - VIP FUTEBOL' - Esporte: Futebol
    '12.68': { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },
    '9.68':  { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },
    '6.34':  { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },
    '4.34':  { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },
    '3.34':  { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },
    '2.34':  { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },
    '1.34':  { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },
    '1.14':  { tipster: 'STK - VIP FUTEBOL', sport: 'Futebol' },

    // Mapeamentos para 'Leozin Tips Props' - Esporte: Futebol
    '12.36': { tipster: 'Leozin Tips Props', sport: 'Futebol' },
    '9.36':  { tipster: 'Leozin Tips Props', sport: 'Futebol' },
    '6.18':  { tipster: 'Leozin Tips Props', sport: 'Futebol' },
    '4.18':  { tipster: 'Leozin Tips Props', sport: 'Futebol' },
    '3.18':  { tipster: 'Leozin Tips Props', sport: 'Futebol' },
    '2.18':  { tipster: 'Leozin Tips Props', sport: 'Futebol' },
    '1.18':  { tipster: 'Leozin Tips Props', sport: 'Futebol' },
    '0.98':  { tipster: 'Leozin Tips Props', sport: 'Futebol' },

    // Mapeamentos para 'Cabreloa Europa' - Esporte: Futebol
    '12.26': { tipster: 'Cabreloa Europa', sport: 'Futebol' },
    '9.26':  { tipster: 'Cabreloa Europa', sport: 'Futebol' },
    '6.13':  { tipster: 'Cabreloa Europa', sport: 'Futebol' },
    '4.13':  { tipster: 'Cabreloa Europa', sport: 'Futebol' },
    '3.13':  { tipster: 'Cabreloa Europa', sport: 'Futebol' },
    '2.13':  { tipster: 'Cabreloa Europa', sport: 'Futebol' },
    '1.13':  { tipster: 'Cabreloa Europa', sport: 'Futebol' },
    '0.93':  { tipster: 'Cabreloa Europa', sport: 'Futebol' },

    // Mapeamentos para 'DiKa Tip's' - Esporte: Futebol
    '12.62': { tipster: "DiKa Tip's", sport: 'Futebol' },
    '9.62':  { tipster: "DiKa Tip's", sport: 'Futebol' },
    '6.31':  { tipster: "DiKa Tip's", sport: 'Futebol' },
    '4.31':  { tipster: "DiKa Tip's", sport: 'Futebol' },
    '3.31':  { tipster: "DiKa Tip's", sport: 'Futebol' },
    '2.31':  { tipster: "DiKa Tip's", sport: 'Futebol' },
    '1.31':  { tipster: "DiKa Tip's", sport: 'Futebol' },
    '1.11':  { tipster: "DiKa Tip's", sport: 'Futebol' },

    // Mapeamentos para 'sout0 TIPS' - Esporte: Futebol
    '12.76': { tipster: 'sout0 TIPS', sport: 'Futebol' },
    '9.76':  { tipster: 'sout0 TIPS', sport: 'Futebol' },
    '6.38':  { tipster: 'sout0 TIPS', sport: 'Futebol' },
    '4.38':  { tipster: 'sout0 TIPS', sport: 'Futebol' },
    '3.38':  { tipster: 'sout0 TIPS', sport: 'Futebol' },
    '2.38':  { tipster: 'sout0 TIPS', sport: 'Futebol' },
    '1.38':  { tipster: 'sout0 TIPS', sport: 'Futebol' },
    '1.18':  { tipster: 'sout0 TIPS', sport: 'Futebol' },

    // Mapeamentos para 'VF Tips' - Esporte: Futebol
    '12.78': { tipster: 'VF Tips', sport: 'Futebol' },
    '9.78':  { tipster: 'VF Tips', sport: 'Futebol' },
    '6.39':  { tipster: 'VF Tips', sport: 'Futebol' },
    '4.39':  { tipster: 'VF Tips', sport: 'Futebol' },
    '3.39':  { tipster: 'VF Tips', sport: 'Futebol' },
    '2.39':  { tipster: 'VF Tips', sport: 'Futebol' },
    '1.39':  { tipster: 'VF Tips', sport: 'Futebol' },
    '1.19':  { tipster: 'VF Tips', sport: 'Futebol' },

    // Mapeamentos para 'LeozinTipsBot' - Esporte: Futebol
    '12.74': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '9.74':  { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '6.37':  { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '4.37':  { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '3.37':  { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '2.37':  { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '1.37':  { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '1.17':  { tipster: 'LeozinTipsBot', sport: 'Futebol' },

    // Mapeamentos para 'LirouTips' - Esporte: Futebol
    '12.28': { tipster: 'LirouTips', sport: 'Futebol' },
    '9.28':  { tipster: 'LirouTips', sport: 'Futebol' },
    '6.14':  { tipster: 'LirouTips', sport: 'Futebol' },
    '4.14':  { tipster: 'LirouTips', sport: 'Futebol' },
    '3.14':  { tipster: 'LirouTips', sport: 'Futebol' },
    '2.14':  { tipster: 'LirouTips', sport: 'Futebol' },
    '1.14':  { tipster: 'LirouTips', sport: 'Futebol' },
    '0.94':  { tipster: 'LirouTips', sport: 'Futebol' },

    // Mapeamentos para 'Kutter Tips NFL - Free' - Esporte: Futebol Americano
    '12.38': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '9.38':  { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '6.19':  { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '4.19':  { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '3.19':  { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '2.19':  { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '1.19':  { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '0.99':  { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },

    // Mapeamentos para 'PROPS [NFL] | Fábio Guilherme' - Esporte: Futebol Americano
    '12.64': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '9.64':  { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '6.32':  { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '4.32':  { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '3.32':  { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '2.32':  { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.32':  { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.12':  { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },

    // Mapeamentos para 'NFL | Fábio Guilherme' - Esporte: Futebol Americano
    '12.66': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '9.66':  { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '6.33':  { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '4.33':  { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '3.33':  { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '2.33':  { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.33':  { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.13':  { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },

    // Mapeamentos para 'Rei do college/NFL football' - Esporte: Futebol Americano
    '12.84': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '9.84':  { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '6.42':  { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '4.42':  { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '3.42':  { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '2.42':  { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '1.42':  { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },

    // Mapeamentos para 'Raphael Schon - NBA Vip' - Esporte: Basquetebol
    '12.18': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '9.18':  { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '6.09':  { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '4.09':  { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '3.09':  { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '2.09':  { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '1.09':  { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '0.89':  { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },

    // Mapeamentos para 'Leozin Tips Nba' - Esporte: Basquetebol
    '12.2':  { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '9.2':   { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '6.1':   { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '4.1':   { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '3.1':   { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '2.1':   { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '1.1':   { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '0.9':   { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },

    // Mapeamentos para 'CABRELOA - NBA' - Esporte: Basquetebol
    '12.6':  { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '9.6':   { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '6.3':   { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '4.3':   { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '3.3':   { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '2.3':   { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '1.3':   { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '1.1':   { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },

    // Mapeamentos para 'NBA - Pre Leozin Tips' - Esporte: Basquetebol
    '12.8':  { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '9.8':   { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '6.4':   { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '4.4':   { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '3.4':   { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '2.4':   { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '1.4':   { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },

    // Mapeamentos para 'NBA - Leozin Tips' - Esporte: Basquetebol
    '12.82': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '9.82':  { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '6.41':  { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '4.41':  { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '3.41':  { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '2.41':  { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '1.41':  { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },

    // Mapeamentos para 'LeozinTipsBot' - Esporte: Futebol
    '12.74': { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '9.74':  { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '6.37':  { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '4.37':  { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '3.37':  { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '2.37':  { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '1.37':  { tipster: 'LeozinTipsBot', sport: 'Futebol' },
    '1.17':  { tipster: 'LeozinTipsBot', sport: 'Futebol' },

    // Mapeamentos para 'LirouTips' - Esporte: Futebol
    '12.28': { tipster: 'LirouTips', sport: 'Futebol' },
    '9.28':  { tipster: 'LirouTips', sport: 'Futebol' },
    '6.14':  { tipster: 'LirouTips', sport: 'Futebol' },
    '4.14':  { tipster: 'LirouTips', sport: 'Futebol' },
    '3.14':  { tipster: 'LirouTips', sport: 'Futebol' },
    '2.14':  { tipster: 'LirouTips', sport: 'Futebol' },
    '1.14':  { tipster: 'LirouTips', sport: 'Futebol' },
    '0.94':  { tipster: 'LirouTips', sport: 'Futebol' },

    // Mapeamentos para 'Kutter Tips NFL - Free' - Esporte: Futebol Americano
    '12.38': { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '9.38':  { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '6.19':  { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '4.19':  { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '3.19':  { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '2.19':  { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '1.19':  { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },
    '0.99':  { tipster: 'Kutter Tips NFL - Free', sport: 'Futebol Americano' },

    // Mapeamentos para 'PROPS [NFL] | Fábio Guilherme' - Esporte: Futebol Americano
    '12.64': { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '9.64':  { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '6.32':  { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '4.32':  { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '3.32':  { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '2.32':  { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.32':  { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.12':  { tipster: 'PROPS [NFL] | Fábio Guilherme', sport: 'Futebol Americano' },

    // Mapeamentos para 'NFL | Fábio Guilherme' - Esporte: Futebol Americano
    '12.66': { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '9.66':  { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '6.33':  { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '4.33':  { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '3.33':  { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '2.33':  { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.33':  { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },
    '1.13':  { tipster: 'NFL | Fábio Guilherme', sport: 'Futebol Americano' },

    // Mapeamentos para 'Rei do college/NFL football' - Esporte: Futebol Americano
    '12.84': { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '9.84':  { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '6.42':  { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '4.42':  { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '3.42':  { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '2.42':  { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },
    '1.42':  { tipster: 'Rei do college/NFL football', sport: 'Futebol Americano' },

    // Mapeamentos para 'Raphael Schon - NBA Vip' - Esporte: Basquetebol
    '12.18': { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '9.18':  { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '6.09':  { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '4.09':  { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '3.09':  { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '2.09':  { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '1.09':  { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },
    '0.89':  { tipster: 'Raphael Schon - NBA Vip', sport: 'Basquetebol' },

    // Mapeamentos para 'Leozin Tips Nba' - Esporte: Basquetebol
    '12.2':  { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '9.2':   { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '6.1':   { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '4.1':   { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '3.1':   { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '2.1':   { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '1.1':   { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },
    '0.9':   { tipster: 'Leozin Tips Nba', sport: 'Basquetebol' },

    // Mapeamentos para 'CABRELOA - NBA' - Esporte: Basquetebol
    '12.6':  { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '9.6':   { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '6.3':   { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '4.3':   { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '3.3':   { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '2.3':   { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '1.3':   { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },
    '1.1':   { tipster: 'CABRELOA - NBA', sport: 'Basquetebol' },

    // Mapeamentos para 'NBA - Pre Leozin Tips' - Esporte: Basquetebol
    '12.8':  { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '9.8':   { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '6.4':   { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '4.4':   { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '3.4':   { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '2.4':   { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },
    '1.4':   { tipster: 'NBA - Pre Leozin Tips', sport: 'Basquetebol' },

    // Mapeamentos para 'NBA - Leozin Tips' - Esporte: Basquetebol
    '12.82': { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '9.82':  { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '6.41':  { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '4.41':  { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '3.41':  { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '2.41':  { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },
    '1.41':  { tipster: 'NBA - Leozin Tips', sport: 'Basquetebol' },

    // Outros mapeamentos podem ser adicionados aqui...
};
  
/********************************************************
 * content.js - KTO (Kambi) 
 * - Captura 'Simples (N)', independente de o contêiner 
 *   ter classe --won ou não.
 * - Expande detalhes se (2) ou mais.
 * - Extrai cada <li class="KambiBC-outcome-item--won/lost">
 * - Garante que todas as linhas (ganhas ou perdidas) 
 *   sejam capturadas.
 * - 20 colunas CSV, com stake->tipster e label <= 100 chars.
 ********************************************************/

/*******************************************************
 * 1) Dicionário para suffix de ID 
 *    (só usado em multi-liner)
 *******************************************************/
let idCounters = {}; // ex.: { '8547988679': 2 }

/*******************************************************
 * 2) getTipsterInfo(stakeValue)
 *******************************************************/
function getTipsterInfo(stakeValue) {
  return stakeToTipster[stakeValue] || { tipster: 'Outros', sport: 'Outro esporte' };
}

/*******************************************************
 * 3) parseDateTimePT(dateStr)
 *******************************************************/
function parseDateTimePT(dateStr) {
  try {
    if (!dateStr.includes('•')) return dateStr;
    const [datePart, timePart] = dateStr.split('•').map(s => s.trim());
    if (!datePart || !timePart) return dateStr;
    const dateRegex = /(\d+)\s+de\s+([a-zç]+)\.?\s+de\s+(\d{4})/i;
    const match = datePart.match(dateRegex);
    if (!match) return dateStr;
    let [, dayStr, monthStr, yearStr] = match;
    dayStr = dayStr.padStart(2, '0');
    const monthsPT = {
      'jan': '01', 'jan.': '01', 'janeiro': '01',
      'fev': '02', 'fev.': '02', 'fevereiro': '02',
      'mar': '03', 'mar.': '03', 'março': '03',
      'abr': '04', 'abr.': '04', 'abril': '04',
      'mai': '05', 'maio': '05',
      'jun': '06', 'jun.': '06', 'junho': '06',
      'jul': '07', 'jul.': '07', 'julho': '07',
      'ago': '08', 'ago.': '08', 'agosto': '08',
      'set': '09', 'set.': '09', 'setembro': '09',
      'out': '10', 'out.': '10', 'outubro': '10',
      'nov': '11', 'nov.': '11', 'novembro': '11',
      'dez': '12', 'dez.': '12', 'dezembro': '12'
    };
    monthStr = monthStr.toLowerCase();
    const monthNum = monthsPT[monthStr] || '01';
    const dateFormatted = `${dayStr}/${monthNum}/${yearStr}`;
    let [h, m, s] = timePart.split(':');
    h = (h || '0').padStart(2, '0');
    m = (m || '0').padStart(2, '0');
    s = (s || '0').padStart(2, '0');
    return `${dateFormatted} ${h}:${m}:${s}`;
  } catch (err) {
    return dateStr;
  }
}

/*******************************************************
 * 4) isBetResolved(betEl)
 *******************************************************/
function isBetResolved(betEl) {
  const statusEl = betEl.querySelector('.KambiBC-my-bets-summary__coupon-status');
  if (!statusEl) return false;
  const st = statusEl.innerText.trim().toLowerCase();
  if (st.includes('resolvidas')) {
    const match = st.match(/^(\d+)\s+de\s+(\d+)\s+resolvidas$/);
    if (match) {
      const resolved = parseInt(match[1], 10);
      const total = parseInt(match[2], 10);
      return resolved === total;
    }
    return false;
  }
  if (st.includes('ganha') || st.includes('perdida')) return true;
  return false;
}

/*******************************************************
 * 5) detectBetType(titleText)
 *******************************************************/
function detectBetType(titleText) {
  const txt = titleText.toLowerCase();
  if (txt.includes('simples')) return 'S';
  // Qualquer palavra diferente de "simples" é tratada como múltipla
  return 'M';
}

/*******************************************************
 * 6) Variável global para evitar extrações simultâneas
 *******************************************************/
let isExtracting = false;

/*******************************************************
 * 7) Listener principal (port)
 *******************************************************/
chrome.runtime.onConnect.addListener((port) => {
  if (port.name !== 'extractionChannel') return;
  port.onMessage.addListener(async (msg) => {
    if (msg.action === 'extractBets') {
      if (isExtracting) {
        console.warn('Extração em andamento. Ignorando...');
        return;
      }
      isExtracting = true;
      try {
        const dataLines = await extractBets();
        try {
          port.postMessage({ success: true, data: dataLines });
        } catch(e) {
          console.warn('Porta desconectada antes de enviar mensagem de sucesso.');
        }
        downloadCSV(dataLines);
      } catch (err) {
        try {
          port.postMessage({ success: false, error: err.message });
        } catch(e) {
          console.warn('Porta desconectada antes de enviar mensagem de erro.');
        }
      } finally {
        isExtracting = false;
        try { port.disconnect(); } catch(_) {}
      }
    }
  });
});

/*******************************************************
 * 8) extractBets()
 *******************************************************/
async function extractBets() {
  idCounters = {};
  const betElements = document.querySelectorAll('.KambiBC-my-bets-summary__coupon');
  const allCsvLines = [];

  for (const betEl of betElements) {
    if (!isBetResolved(betEl)) continue;
    const titleEl = betEl.querySelector('.KambiBC-my-bets-summary__title');
    if (!titleEl) continue;
    const rawTitle = titleEl.innerText.trim();
    const betType = detectBetType(rawTitle);

    if (betType === 'M') {
      // Extrai diretamente para múltiplas
      const multiLine = extractMultiLine(betEl, betType);
      if (multiLine) allCsvLines.push(multiLine);
      continue;
    }

    // Para "Simples" ...
    if (!rawTitle.toLowerCase().includes('simples')) continue;

    let numberOfSelections = 1;
    const match = rawTitle.match(/\( *(\d+) *\)/);
    if (match && match[1]) {
      numberOfSelections = parseInt(match[1], 10);
    }

    const dateTimeEl = betEl.querySelector('.KambiBC-my-bets-summary__coupon-date');
    let dateTime = dateTimeEl ? dateTimeEl.innerText.trim() : '';
    dateTime = parseDateTimePT(dateTime);

    const couponRefEl = betEl.querySelector('.KambiBC-my-bets-summary__coupon-ref .KambiBC-my-bets-summary__value');
    const betId = couponRefEl ? couponRefEl.innerText.trim() : '';

    if (numberOfSelections > 1) {
      // "Simples (2+)" => multi-liner
      betEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      betEl.click();
      await new Promise(res => setTimeout(res, 3000));
      const collapsible = betEl.closest('.KambiBC-react-collapsable-container');
      if (!collapsible) continue;
      const detailContainer = collapsible.querySelector('.KambiBC-bethistory-detail');
      if (!detailContainer) continue;
      const outcomeItems = detailContainer.querySelectorAll('li.KambiBC-outcome-item');
      if (!outcomeItems.length) continue;
      for (const liEl of outcomeItems) {
        const line = extractDetailLine(liEl, betId, dateTime, 'S');
        if (line) allCsvLines.push(line);
      }
    } else {
      // Single-liner "Simples (1)"
      const singleLine = extractSingleSimple(betEl, 'S');
      if (singleLine) allCsvLines.push(singleLine);
    }
  }

  return allCsvLines;
}

/*******************************************************
 * 9) extractSingleSimple(betEl, betType)
 *******************************************************/
function extractSingleSimple(betEl, betType) {
  const couponRefEl = betEl.querySelector('.KambiBC-my-bets-summary__coupon-ref .KambiBC-my-bets-summary__value');
  const betId = couponRefEl ? couponRefEl.innerText.trim() : '';

  const dateTimeEl = betEl.querySelector('.KambiBC-my-bets-summary__coupon-date');
  let dateTime = dateTimeEl ? dateTimeEl.innerText.trim() : '';
  dateTime = parseDateTimePT(dateTime);

  let odds = '1.00';
  if (betType === 'M') {
    // Tenta extrair odds do título primeiro (ex: "Dupla @6.50 Perdida")
    const titleElement = betEl.querySelector('.KambiBC-my-bets-summary__title');
    if (titleElement) {
      const oddsSpan = titleElement.querySelector('.KambiBC-my-bets-summary__field .KambiBC-my-bets-summary__value');
      if (oddsSpan) {
        let rawOdds = oddsSpan.innerText.replace(/[^\d,\.]/g, '').replace(',', '.');
        if (!isNaN(parseFloat(rawOdds))) {
          odds = parseFloat(rawOdds).toFixed(2);
        }
      } else {
        // Fallback: tenta extrair do summary
        const oddsContainer = betEl.querySelector('.KambiBC-my-bets-summary__odds-bog .KambiBC-my-bets-summary__value');
        if (oddsContainer) {
          let rawOdds = oddsContainer.innerText.replace(/[^\d,\.]/g, '').replace(',', '.');
          if (!isNaN(parseFloat(rawOdds))) {
            odds = parseFloat(rawOdds).toFixed(2);
          }
        }
      }
    }
  } else {
    // Extrai odds para simples
    const titleEl = betEl.querySelector('.KambiBC-my-bets-summary__title');
    const oddsFieldEl = titleEl?.querySelector('.KambiBC-my-bets-summary__field .KambiBC-my-bets-summary__value');
    if (oddsFieldEl) {
      let rawOdds = oddsFieldEl.innerText.replace(/[^\d,\.]/g, '').replace(',', '.');
      if (!isNaN(parseFloat(rawOdds))) {
        odds = parseFloat(rawOdds).toFixed(2);
      }
    }
  }

  let stakeVal = '0.00';
  const stakeEl = betEl.querySelector('.KambiBC-my-bets-summary__stake-value');
  if (stakeEl) {
    stakeVal = stakeEl.innerText.replace(/[^\d,\.]/g, '').replace(',', '.');
  }
  const numericStake = parseFloat(stakeVal).toFixed(2);

  let totalValue = '0.00';
  const payoutEl = betEl.querySelector('.KambiBC-my-bets-summary-payout__value');
  if (payoutEl) {
    totalValue = payoutEl.innerText.replace(/[^\d,\.]/g, '').replace(',', '.');
  }

  let label = '';
  const labelParts = betEl.querySelectorAll('.KambiBC-my-bets-summary-coupon__event-list-name span');
  labelParts.forEach(part => {
    const txt = part.innerText.trim();
    if (txt) label += txt + ' - ';
  });
  label = label.replace(/\s-\s$/, '');
  if (label.length > 100) label = label.slice(0,100) + '...';

  const tipsterInfo = getTipsterInfo(numericStake);
  let betState = 'W'; // default

  let betData = {
    id: betId,
    date: dateTime,
    type: betType, // 'S' ou 'M'
    sport: tipsterInfo.sport,
    label,
    odds,
    stake: numericStake,
    totalValue: parseFloat(totalValue).toFixed(2),
    state: betState,
    bookmaker: 'KTO',
    tipster: tipsterInfo.tipster,
    category: 'ML',
    competition: '',
    betType: '',
    closing: '',
    comment: label,
    live: '',
    freebet: '',
    cashout: '',
    eachWay: ''
  };

  if (parseFloat(betData.totalValue) === 0) {
    betData.state = 'L';
  }

  return formatBetData(betData);
}

/*******************************************************
 * 10) extractDetailLine(liEl, betId, dateTime, betType)
 *******************************************************/
function extractDetailLine(liEl, betId, dateTime, betType) {
  const infoArticle = liEl.querySelector('.KambiBC-outcome-item__info-list');
  if (!infoArticle) return null;

  let betState = '';
  if (infoArticle.classList.contains('KambiBC-outcome-item__info-list--won')) {
    betState = 'W';
  } else if (infoArticle.classList.contains('KambiBC-outcome-item__info-list--lost')) {
    betState = 'L';
  } else {
    return null;
  }

  let label = '';
  let odds = '1.00';
  const headerDiv = infoArticle.querySelector('.KambiBC-outcome-item__name div');
  if (headerDiv) {
    let rawHeader = headerDiv.innerText.trim();
    const matchOdds = rawHeader.match(/@ *([\d.,]+)/);
    if (matchOdds && matchOdds[1]) {
      let rawOdds = matchOdds[1].replace(/[^\d,\.]/g, '').replace(',', '.');
      if (!isNaN(parseFloat(rawOdds))) odds = parseFloat(rawOdds).toFixed(2);
    }
    rawHeader = rawHeader.replace(/@ *([\d.,]+)/, '').trim();
    label = rawHeader;
  }
  if (label.length > 100) label = label.slice(0, 100) + '...';

  let stakeVal = '0.00';
  const stakeSpan = infoArticle.querySelector('.KambiBC-outcome-item__betstake__label span');
  if (stakeSpan) {
    stakeVal = stakeSpan.innerText.replace(/[^\d,\.]/g, '').replace(',', '.');
  }
  const numericStake = parseFloat(stakeVal).toFixed(2);

  let sport = 'Outro esporte';
  const eventGroups = infoArticle.querySelectorAll('.KambiBC-outcome-item__event-group');
  for (const eg of eventGroups) {
    const txt = eg.innerText.toLowerCase();
    if (txt.includes('futebol')) {
      sport = 'Futebol';
      break;
    }
  }

  const tipsterInfo = getTipsterInfo(numericStake);
  if (tipsterInfo.sport !== 'Outro esporte') sport = tipsterInfo.sport;

  let totalValue = '0.00';
  if (betState === 'W') {
    totalValue = (parseFloat(numericStake) * parseFloat(odds)).toFixed(2);
  }

  let betData = {
    id: betId,
    date: dateTime,
    type: betType, // 'S'
    sport,
    label,
    odds,
    stake: numericStake,
    totalValue,
    state: betState,
    bookmaker: 'KTO',
    tipster: tipsterInfo.tipster,
    category: 'ML',
    competition: '',
    betType: '',
    closing: '',
    comment: label,
    live: '',
    freebet: '',
    cashout: '',
    eachWay: ''
  };

  if (parseFloat(betData.totalValue) === 0) {
    betData.state = 'L';
  }

  // Aplica sufixo somente se betType==='S'
  if (betType === 'S') {
    if (!idCounters[betId]) {
      idCounters[betId] = 0;
    }
    idCounters[betId]++;
    const seqNum = String(idCounters[betId]).padStart(2, '0');
    betData.id = `${betData.id}-${seqNum}`;
  }

  return formatBetData(betData);
}

/*******************************************************
 * 11) extractMultiLine(betEl, betType)
 *    - Para apostas múltiplas ('M'), extrai sem detalhes
 *******************************************************/
function extractMultiLine(betEl, betType) {
  const couponRefEl = betEl.querySelector('.KambiBC-my-bets-summary__coupon-ref .KambiBC-my-bets-summary__value');
  const betId = couponRefEl ? couponRefEl.innerText.trim() : '';

  const dateTimeEl = betEl.querySelector('.KambiBC-my-bets-summary__coupon-date');
  let dateTime = dateTimeEl ? dateTimeEl.innerText.trim() : '';
  dateTime = parseDateTimePT(dateTime);

  let odds = '1.00';
  if (betType === 'M') {
    // Tenta extrair odds do título primeiro (ex: "Dupla @6.50 Perdida")
    const titleElement = betEl.querySelector('.KambiBC-my-bets-summary__title');
    if (titleElement) {
      const oddsSpan = titleElement.querySelector('.KambiBC-my-bets-summary__field .KambiBC-my-bets-summary__value');
      if (oddsSpan) {
        let rawOdds = oddsSpan.innerText.replace(/[^\d,\.]/g, '').replace(',', '.');
        if (!isNaN(parseFloat(rawOdds))) {
          odds = parseFloat(rawOdds).toFixed(2);
        }
      } else {
        // Fallback: tenta extrair odds do summary
        const oddsContainer = betEl.querySelector('.KambiBC-my-bets-summary__odds-bog .KambiBC-my-bets-summary__value');
        if (oddsContainer) {
          let rawOdds = oddsContainer.innerText.replace(/[^\d,\.]/g, '').replace(',', '.');
          if (!isNaN(parseFloat(rawOdds))) {
            odds = parseFloat(rawOdds).toFixed(2);
          }
        }
      }
    }
  }

  let stakeVal = '0.00';
  const stakeEl = betEl.querySelector('.KambiBC-my-bets-summary__stake-value');
  if (stakeEl) {
    stakeVal = stakeEl.innerText.replace(/[^\d,\.]/g, '').replace(',', '.');
  }
  const numericStake = parseFloat(stakeVal).toFixed(2);

  let totalValue = '0.00';
  const payoutEl = betEl.querySelector('.KambiBC-my-bets-summary-payout__value');
  if (payoutEl) {
    totalValue = payoutEl.innerText.replace(/[^\d,\.]/g, '').replace(',', '.');
  }

  let label = '';
  const labelParts = betEl.querySelectorAll('.KambiBC-my-bets-summary-coupon__event-list-name span');
  labelParts.forEach(part => {
    const txt = part.innerText.trim();
    if (txt) label += txt + ' - ';
  });
  label = label.replace(/\s-\s$/, '');
  if (label.length > 100) label = label.slice(0,100) + '...';

  // Tipster
  const tipsterInfo = getTipsterInfo(numericStake);
  let betState = 'W'; // default

  let betData = {
    id: betId,
    date: dateTime,
    type: betType, // 'M'
    sport: tipsterInfo.sport,
    label,
    odds,
    stake: numericStake,
    totalValue: parseFloat(totalValue).toFixed(2),
    state: betState,
    bookmaker: 'KTO',
    tipster: tipsterInfo.tipster,
    category: 'ML',
    competition: '',
    betType: '',
    closing: '',
    comment: label,
    live: '',
    freebet: '',
    cashout: '',
    eachWay: ''
  };

  // Se totalValue=0 => L
  if (parseFloat(betData.totalValue) === 0) {
    betData.state = 'L';
  }

  // Não aplica sufixo para múltiplas
  return formatBetData(betData);
}

/*******************************************************
 * 12) formatBetData(bet)
 *******************************************************/
function formatBetData(bet) {
  return [
    bet.id || '',
    bet.date || '',
    bet.type || '',
    bet.sport || '',
    bet.label || '',
    bet.odds || '0.00',
    bet.stake || '0.00',
    bet.totalValue || '0.00',
    bet.state || '',
    bet.bookmaker || '',
    bet.tipster || '',
    bet.category || '',
    bet.competition || '',
    bet.betType || '',
    bet.closing || '',
    bet.comment || '',
    bet.live || '',
    bet.freebet || '',
    bet.cashout || '',
    bet.eachWay || ''
  ].join(';');
}

/*******************************************************
 * 13) downloadCSV(csvLines)
 *******************************************************/
function downloadCSV(csvLines) {
  if (!csvLines || !csvLines.length) {
    console.log('Nenhuma aposta capturada.');
    return;
  }
  const header = "ID;Date;Type;Sport;Label;Odds;Stake;TotalValue;State;Bookmaker;Tipster;Category;Competition;BetType;Closing;Comment;Live;Freebet;Cashout;EachWay";
  const csvContent = [header, ...csvLines].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `kto_bets_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  console.log(`Baixado CSV com ${csvLines.length} linhas.`);
}