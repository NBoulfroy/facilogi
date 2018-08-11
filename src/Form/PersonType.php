<?php

namespace App\Form;

use App\Entity\Person;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\EmailType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PersonType extends AbstractType
{
    /**
     * @inheritdoc
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('lastName', TextType::class, array(
                'label' => 'Last name: ',
                'attr'  => array(
                    'data-variety' => 'lastName',
                    'pattern'      => '^[A-Z]{1,15}$'
                ),
                'required' => true
            ))
            ->add('firstName', TextType::class, array(
                'label' => 'First name: ',
                'attr'  => array(
                    'data-variety' => 'firstName',
                    'pattern'      => '^[A-z]{1,15}$'
                ),
                'required' => true
            ))
            ->add('age', IntegerType::class, array(
                'label' => 'Age: ',
                'attr'  => array(
                    'data-variety' => 'age',
                    'pattern'      => '^[0-9]{1,2}$'
                ),
                'required' => true
            ))
            ->add('email', EmailType::class, array(
                'label' => 'email: ',
                'attr'  => array(
                    'data-variety' => 'email',
                    'pattern'      => '^[0-9a-z]([-_.]?[0-9a-z])*@[0-9a-z]([-_.]?[0-9a-z])*\.[a-z]{2,4}$'
                ),
                'required' => true
            ))
            ->add('submit', SubmitType::class, array(
                'attr'  => array(
                    'class'        => 'btn btn-danger col-sm-2 offset-sm-5 col-md-4 offset-md-4 col-lg-2 offset-lg-5 col-xl-2 offset-xl-5',
                    'disabled'     => 'disabled'
                )
            ))
        ;
    }

    /**
     * @inheritdoc
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Person::class,
        ]);
    }
}
