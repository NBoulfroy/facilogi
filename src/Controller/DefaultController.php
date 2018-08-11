<?php

namespace App\Controller;

use App\Entity\Person;
use Doctrine\ORM\ORMException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use App\Form\PersonType;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function index(Request $request)
    {
        $form = $this->createForm(PersonType::class);

        return $this->render('default/index.html.twig', [
            'form' => $form->createView()
        ]);
    }

    /**
     * @Route("/post-person", name="postPerson")
     */
    public function postPerson(Request $request)
    {
        if (!$request->isXmlHttpRequest()) {
            return $this->redirectToRoute('homepage');
        } else {
            $lastName = $request->get('person')['lastName'];
            $firstName = $request->get('person')['firstName'];
            $age = $request->get('person')['age'];
            $email = $request->get('person')['email'];

            $dataControl = $this->container->get('app.service.data_control_manager')->control(
                ['lastName' => $lastName, 'firstName' => $firstName, 'age' => $age, 'email' => $email]
            );

            if ($dataControl > 0) {
                return new JsonResponse(array(
                        'status'  => 'error',
                        'message' => 'Wrong data entered'
                    )
                );
            } else {
                $person = (new Person())
                    ->setLastName($lastName)
                    ->setFirstName($firstName)
                    ->setAge($age)
                    ->setEmail($email);

                $doctrine = $this->getDoctrine()->getManager();

                try {
                    $doctrine->persist($person);
                    $doctrine->flush();

                    return new JsonResponse(array(
                        'status'  => 'success',
                        'message' => 'Your data has been added with success',
                        'data'    => array(
                            'lastName'  => $lastName,
                            'firstName' => $firstName,
                            'age'       => $age,
                            'email'     => $email
                        )
                    ));
                } catch (ORMException $e) {
                    return new JsonResponse(array(
                        'status'  => 'error',
                        'message' => 'An error is occurred during the process',
                        'data'    => array(
                            'code'    => $e->getCode(),
                            'message' => $e->getMessage()
                        )
                    ));
                }
            }
        }
    }
}
