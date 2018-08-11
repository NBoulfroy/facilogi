<?php

namespace App\Service;

class DataControlManager
{
    /** @var int $error */
    private $error;

    public function __construct()
    {
        $this->error = 0;
    }

    /**
     * @return int
     */
    public function getError(): int
    {
        return $this->error;
    }

    /**
     * @param int $error
     */
    public function setError(int $error): void
    {
        $this->error = $error;
    }

    /**
     * Controls a value with last name pattern.
     *
     * @param string $value
     * @return bool
     */
    private function lastName($value)
    {
        return preg_match('/^[A-Z]{1,15}$/', $value);
    }

    /**
     * Controls a value with first name pattern.
     *
     * @param string $value
     * @return bool
     */
    private function firstName($value)
    {
        return preg_match('/^[A-z]{1,15}$/', $value);
    }

    /**
     * Controls a value with age.
     *
     * @param string $value
     * @return bool
     */
    private function age($value)
    {
        return ($value === '') ? false : is_numeric($value);
    }

    private function email($value)
    {
        return preg_match('/^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*\.[a-z]{2,4}$/', $value);
    }

    public function control($data)
    {
        $keys = array_keys($data);

        foreach ($keys as $key) {

            switch($key) {
                default:
                    $this->error += 1;
                case 'lastName':
                    (!self::lastName($data[$key])) ? $this->error += 1 : $this->error;
                    break;
                case 'firstName':
                    (!self::firstName($data[$key])) ? $this->error = 1 : $this->error;
                    break;
                case 'age':
                    (!self::age($data[$key])) ? $this->error += 1 : $this->error;
                    break;
                case 'email':
                    (!self::email($data[$key])) ? $this->error += 1 : $this->error;
                    break;
            }
        }

        return $this->error;
    }
}
