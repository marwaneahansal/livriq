#!/usr/bin/env bash
function display_help {
  echo "Livriq"
  echo
  echo "Usage:" >&2
  echo "  livriq COMMAND [options] [arguments]"
  echo
  echo "Unknown commands are passed to the docker-compose binary."
  echo
  echo "docker-compose Commands:"
  echo "  livriq up        Start the application"
  echo "  livriq up -d     Start the application in the background"
  echo "  livriq stop      Stop the application"
  echo "  livriq down      Stop the application and remove related resources"
  echo "  livriq restart   Restart the application"
  echo "  livriq ps        Display the status of all containers"
  echo
  echo "Node Commands:"
  echo "  livriq node ...         Run a Node command"
  echo "  livriq node --version"
  echo
  echo "Yarn Commands:"
  echo "  livriq yarn ...        Run a Yarn command"
  echo
  echo "Prisma Commands:"
  echo "  livriq prisma ...        Run a prisma command"
  echo
  echo "Customization:"
  echo "  livriq build --no-cache       Rebuild all of the livriq containers"

  exit 1
}

if [ $# -gt 0 ]; then
  if [ "$1" == "yarn" ]; then
    shift 1
    docker compose exec -it app yarn "$@"
  elif [ "$1" == "node" ]; then
    shift 1
    docker compose exec -it app node "$@"
  elif [ "$1" == "prisma" ]; then
    shift 1
    docker compose exec -it app npx prisma "$@"
  elif [ "$1" == "help" ] || [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
    display_help
  else
    docker compose  "$@"
  fi
else
  display_help
fi