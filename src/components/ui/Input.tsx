interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string 
}

function Input({error, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <input
        {...props}
        className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-purple-500"
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}
    </div>
  )
}

export default Input