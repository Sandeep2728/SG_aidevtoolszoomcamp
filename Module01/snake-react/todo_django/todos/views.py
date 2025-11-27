from django.shortcuts import render, redirect, get_object_or_404
from .models import Task
from .forms import TaskForm


def index(request):
    # Handle create
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = TaskForm()

    tasks = Task.objects.order_by('-created')
    return render(request, 'todos/list.html', {'tasks': tasks, 'form': form})


def toggle(request, pk):
    task = get_object_or_404(Task, pk=pk)
    # If status provided in POST, set it. Otherwise toggle between pending/done
    if request.method == 'POST':
        status = request.POST.get('status')
        if status in dict(Task.STATUS_CHOICES):
            task.status = status
        else:
            # fallback toggle
            task.status = Task.STATUS_DONE if task.status != Task.STATUS_DONE else Task.STATUS_PENDING
        task.save()
    return redirect('index')


def delete(request, pk):
    task = get_object_or_404(Task, pk=pk)
    task.delete()
    return redirect('index')
