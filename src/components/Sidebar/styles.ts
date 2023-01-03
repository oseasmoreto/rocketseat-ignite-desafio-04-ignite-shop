import { styled } from "../../styles/index";

export const Container = styled('div',{
  '.bm-cross': {
    background: '#8D8D99',
    height: '15.75px !important' 
  },

  '.bm-menu': {
    overflow: 'hidden !important',

    '.bm-item-list': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      height: 'calc(100vh - 6rem) !important'
    }
  },

  '.bm-burger-button': {
    display: 'none'
  },

  '.button-cart': {
    backgroundColor: '$gray800',
    border: 0,
    width: 48,
    height: 48,
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'all 0.2s',
    position: 'relative',
    
    svg: {
      color: '#8D8D99'
    },

    '&:hover': {
      backgroundColor: '$green300',
    
      svg: {
        color: '$white'
      },
    },

    span: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: -12,
      right: 0,
      backgroundColor: '$green500',
      width: 24,
      height: 24,
      borderRadius: '50%',
      textAlign: 'center',
      color: '$white'
    }
  },

  '.bm-menu-wrap': {
    position: 'absolute !important',
    top: 0,
    right: '0 !important',
    maxHeight: '100vh !important',
    height: '100vh !important',
    width: '480px !important',
    padding: '3rem',
    backgroundColor: '$gray800',
    boxShadow: '-8px 2px 19px -7px rgba(0,0,0,0.85)',
  },

  '.menu-item-cart': {
    height: '100%',
    width: '100%',
    maxHeight: '600px !important',
    overflow: 'auto !important',
  },

  '.menu-item-cart-empty': {
    height: '100%',

    '.box-empty': {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 80,
      marginTop: '2rem',
      backgroundColor: '$gray900',
      borderRadius: 8,
      textAlign: 'center',

      p: {
        textAlign: 'center',
        width: '100%',
      }
    }
  },

  '.menu-item-amount': {
    display: 'flex',
    flexDirection: 'column',

    '.quantity': {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',

      span: {
        fontSize: '1rem',
        color: '$gray100',
        lineHeight: 1.6,
      }
    },

    '.amount': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: '3.75rem',

      span: {
        fontSize: '$md',
        fontWeight: 'bold',
        color: '$gray100',
        lineHeight: 1.6,

        '&:nth-child(2)': {
          fontSize: '$xl',
        }
      }
    },

    button: {
      fontSize: '$md',
      backgroundColor: '$green500',
      height: 69,
      borderRadius: 8,
      border: 0,
      color: '$white',
      transition: 'all 0.2s',
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: '$green300',
      },

      '&:disabled': {
        cursor: 'not-allowed',
        backgroundColor: '$gray300',
      }
    }
  },

  '.menu-item': {
    display: 'flex !important',
    justifyContent: 'flex-start',

    h2: {
      marginTop: '1.5rem',
      fontSize: '$lg',
      color: '$gray100',
      fontWeight: 'bold'
    },

    '.items-cart': {
      marginTop: '2rem',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      gap: '1.5rem',

      '.item-cart': {
        display: 'flex',
        gap: '1.5rem',

        '.image-box': {
          width: 102,
          height: 93,
          borderRadius: 8,
          background: 'linear-gradient(180deg, #1ea483 0%,#7465d4 100%)',
        },

        '.info': {
          display: 'flex',
          flexDirection: 'column',

          h4: {
            fontWeight: 'normal',
            fontSize: '$md',
            color: '$gray300',
            lineHeight: 1.6
          },

          strong: {
            fontSize: '$md',
            color: '$gray100',
            lineHeight: 1.6
          },

          button: {
            background: 'transparent',
            border: 0,
            color: '$green500',
            fontWeight: 'bold',
            fontSize: '1rem',
            textAlign: 'left',
            cursor: 'pointer',
            marginTop: '0.5rem',
            transition: 'all 0.2s',

            '&:hover': {
              color: '$green300',
            }
          }
        }
      }
    }
  }
})