import { useState, useCallback } from 'react'

interface ValidationRule {
  validate: (value: any) => boolean
  message: string
}

interface ValidationRules {
  [key: string]: ValidationRule[]
}

interface FormErrors {
  [key: string]: string
}

interface UseFormProps<T> {
  initialValues: T
  validationRules?: ValidationRules
  onSubmit: (values: T) => void | Promise<void>
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  validationRules = {},
  onSubmit,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = useCallback(
    (name: string, value: any) => {
      const rules = validationRules[name]
      if (!rules) return ''

      for (const rule of rules) {
        if (!rule.validate(value)) {
          return rule.message
        }
      }

      return ''
    },
    [validationRules]
  )

  const validateForm = useCallback(() => {
    const newErrors: FormErrors = {}
    let isValid = true

    Object.keys(values).forEach((key) => {
      const error = validateField(key, values[key])
      if (error) {
        newErrors[key] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }, [values, validateField])

  const handleChange = useCallback(
    (name: string, value: any) => {
      setValues((prev) => ({ ...prev, [name]: value }))
      const error = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: error }))
    },
    [validateField]
  )

  const handleSubmit = useCallback(
    async (e?: React.FormEvent) => {
      if (e) {
        e.preventDefault()
      }

      if (!validateForm()) {
        return
      }

      setIsSubmitting(true)
      try {
        await onSubmit(values)
      } finally {
        setIsSubmitting(false)
      }
    },
    [values, validateForm, onSubmit]
  )

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [initialValues])

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset,
  }
}

// Example usage:
/*
interface LoginForm {
  email: string
  password: string
}

const validationRules: ValidationRules = {
  email: [
    {
      validate: (value) => !!value,
      message: 'Email is required',
    },
    {
      validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: 'Invalid email format',
    },
  ],
  password: [
    {
      validate: (value) => !!value,
      message: 'Password is required',
    },
    {
      validate: (value) => value.length >= 6,
      message: 'Password must be at least 6 characters',
    },
  ],
}

const { values, errors, isSubmitting, handleChange, handleSubmit } = useForm<LoginForm>({
  initialValues: {
    email: '',
    password: '',
  },
  validationRules,
  onSubmit: async (values) => {
    // Handle form submission
    await login(values.email, values.password)
  },
})

return (
  <form onSubmit={handleSubmit}>
    <input
      type="email"
      value={values.email}
      onChange={(e) => handleChange('email', e.target.value)}
    />
    {errors.email && <span>{errors.email}</span>}

    <input
      type="password"
      value={values.password}
      onChange={(e) => handleChange('password', e.target.value)}
    />
    {errors.password && <span>{errors.password}</span>}

    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? 'Logging in...' : 'Login'}
    </button>
  </form>
)
*/ 