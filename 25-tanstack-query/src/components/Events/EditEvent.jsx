import { Link, redirect, useNavigate, useParams, useSubmit, useNavigation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { queryClient, fetchEvent, updateEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const { state } = useNavigation();
  const submit = useSubmit();
  const params = useParams();

  const { data, isError, error } = useQuery({
    queryKey: ['events', { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    staleTime: 10000,
  });

  // const { mutate } = useMutation({
  //   mutationFn: updateEvent,
  //   onMutate: async (data) => {
  //     await queryClient.cancelQueries({ queryKey: ['events', { id: params.id }] });
  //     const prevEvent = queryClient.getQueryData(['events', { id: params.id }]);
  //
  //     queryClient.setQueryData(['events', { id: params.id }], data.event);
  //
  //     return {
  //       prevEvent,
  //     };
  //   },
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(['events', { id: params.id }], context.prevEvent);
  //   },
  //   onSettled: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ['events', { id: params.id }],
  //       refetchType: 'none',
  //     });
  //   },
  // });

  function handleSubmit(formData) {
    submit(formData, {
      method: 'PUT',
    })

    // mutate({ id: params.id, event: formData });
    // navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isError) {
    content = (
      <>
        <ErrorBlock title="Failed to load event." message={error.info?.message || 'Failed to load event. Please check your inputs and try again later.'} />
        <div>
          <Link to="../" className="button">
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm inputData={data} onSubmit={handleSubmit}>
        { state === 'submitting' ? (
            <p>Sending data...</p>
          ) : (
            <>
              <Link to="../" className="button-text">
                Cancel
              </Link>
              <button type="submit" className="button">
                Update
              </button>
            </>
          )}
      </EventForm>
    );
  }

  return (
    <Modal onClose={handleClose}>
      { content }
    </Modal>
  );
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

export async function action({ request, params }) {
  const formData = await request.json();
  const updatedEventData = Object.fromEntries(formData);

  await updateEvent({ id: params.id, event: updatedEventData });

  await queryClient.invalidateQueries({ queryKey: ['events'] });

  return redirect('../');
}