import { styled } from "..";

export const Container = styled('div',{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  minHeight: '100vh',
  justifyContent: 'center'
})

export const Header = styled('header',{
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  button: {
    backgroundColor: '$gray800',
    border: 0,
    width: 48,
    height: 48,
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'all 0.2s',
    
    svg: {
      color: '#8D8D99'
    },

    '&:hover': {
      backgroundColor: '$green300',
    
      svg: {
        color: '$white'
      },
    }
  }
})