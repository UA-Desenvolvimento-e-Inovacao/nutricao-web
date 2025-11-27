type PropsData = {
  data: string;
  setData: (value: string) => void;
  name?: string;
  label?: string
};

function InputDate({ data, setData, name, ...props }: PropsData) {
  return (
    <div>
        <label htmlFor={name} className='text-gray-600 font-medium'>{props.label} </label>
      <input
        type="date"
        name={name}
        id={name}
        value={data}
        onChange={(e)=> setData(e.target.value)}
        className='w-32 px-2 py-1 cursor-pointer rounded border border-[#DADADA] shadow-sm text-gray-600 appearance-none focus:outline-none hover:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)] focus:shadow-[0_0_2px_2px_rgba(204,234,173,0.2)]'
      />
    </div>
  )
}

export default InputDate
