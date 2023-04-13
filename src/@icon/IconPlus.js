const IconPlus = ({ w, fillColor = '#337bff' }) => {
  return (
    <svg width={w} height={w} viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <path d='M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z' fill={fillColor} />
      <path d='M448 298.666667h128v426.666666h-128z' fill='#FFFFFF' />
      <path d='M298.666667 448h426.666666v128H298.666667z' fill='#FFFFFF' />
    </svg>
  )
}

export default IconPlus
