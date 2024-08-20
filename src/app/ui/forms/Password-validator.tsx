export function PasswordValidator({ password }: { password: string }) {
    const SPECIAL_CHARACTERS_REGEX = /[@$!%*?&]/;

    return (
        <ul className="text-xs ml-1">
            <li className={`${password && password.length >= 8 ? "text-green-500": "text-red-600 dark:text-red-600" }`}>
                Mínimo 8 caracteres
            </li>
            <li className={`${password && /[A-Z]/.test(password) ? "text-green-500" : "text-red-600 dark:text-red-600"}`}>
                Letra Mayúscula
            </li>
            <li className={`${password && SPECIAL_CHARACTERS_REGEX.test(password) ? "text-green-500" : "text-red-600 dark:text-red-600"}`}>
                Al menos un carácter especial (@$!%*?&)
            </li>
        </ul>
    );
}

