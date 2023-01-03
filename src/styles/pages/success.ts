import { styled } from "..";

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '656px',

  maxWidth: 1180,
  margin: '0 auto',

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
    marginTop: '2rem',
  },

  p: {
    marginTop: '2rem',
    maxWidth: 590,
    fontSize: '$xl',
    color: '$gray300',
    textAlign: 'center',
    lineHeight: 1.4
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300',
    }
  },

  '.box-images': {
    display: 'flex',

  }
})

export const ImageContainer = styled('div', {
  width: 140,
  height: 140,

  background: 'linear-gradient(180deg, #1ea483 0%,#7465d4 100%)',
  borderRadius: '50%',
  padding: '0.25rem',
  marginTop: '4rem',
  marginLeft: -60,

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '-8px 2px 19px -7px rgba(0,0,0,0.85)',

  '&:nth-child(1)': {
    marginLeft: 0
  },

  img: {
    objectFit: 'cover'
  }
})