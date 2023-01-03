import { styled } from "../../styles/index"

export const Container = styled('main',{
  display: 'flex',
  gap: '3rem',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: '656px'
})

export const BoxSkeleton = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  width: 696,

  '.item-lg': {
    background: '#202024',
    width: 696,
    height: 600,
    borderRadius: 8,
    marginBottom: '1.5rem'
  },

  '.item-md': {
    background: '#202024',
    width: 330,
    height: 32,
    borderRadius: 8,
    animation: 'skeleton-loading 1s linear infinite alternate',
  },

  '.item-sm': {
    background: '#202024',
    width: 100,
    height: 32,
    borderRadius: 8,
    animation: 'skeleton-loading 1s linear infinite alternate',
  }
})