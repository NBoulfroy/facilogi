<?php

namespace App\EventListener;

use Doctrine\ORM\Event\LifecycleEventArgs;
use App\Entity\Person;
use DateTime;

class PersonListener
{
    /**
     * @inheritdoc
     */
    public function prePersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();

        if (!$entity instanceof Person) {
            return;
        }

        $entity->setDateCreation((new DateTime()));
    }
}
