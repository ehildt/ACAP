import os
from pathlib import Path
import argparse
from types import SimpleNamespace
from jinja2 import Environment, FileSystemLoader

ENV_USE_KAFKA = 'USE_KAFKA'
ENV_USE_REDIS_PUBSUB = 'USE_REDIS_PUBSUB'
ENV_USE_BULLMQ = 'USE_BULLMQ'
ENV_USE_MQTT = 'USE_MQTT'
ENV_USE_RABBITMQ = 'USE_RABBITMQ'


def render_template(template_dir, template_name, context):
    """
    Render a Jinja2 template with the given context.
    """
    env = Environment(loader=FileSystemLoader(template_dir))
    return env.get_template(template_name).render(context)

def get_env(env_name):
    """
    Get the environment variable and check if it is set to 'true'.
    """
    return os.getenv(env_name, 'false').lower() == 'true'

def generate_docker_compose(template_dir):
    """
    Generate the docker-compose configuration by rendering templates based on environment variables.
    """

    env_vars = {
        'use_kafka': get_env(ENV_USE_KAFKA),
        'use_pubsub': get_env(ENV_USE_REDIS_PUBSUB),
        'use_bullmq': get_env(ENV_USE_BULLMQ),
        'use_mqtt': get_env(ENV_USE_MQTT),
        'use_rabbitmq': get_env(ENV_USE_RABBITMQ),
    }

    envs = SimpleNamespace(**env_vars)
    templates = ['backend.yml.j2', 'frontend.yml.j2']

    if (envs.use_pubsub or envs.use_bullmq or envs.use_kafka) and envs.use_rabbitmq:
        templates.append('ms-bridge.yml.j2')
    
    # is used by both backend and ms-bridge
    if envs.use_rabbitmq:
        templates.append('rabbitmq.yml.j2')

    if envs.use_kafka and envs.use_bullmq:
        templates.append('kafka.yml.j2')
    
    if envs.use_mqtt and envs.use_bullmq:
        templates.append('mqtt.yml.j2')
    
    templates.extend(['volumes.yml.j2', 'networks.yml.j2'])

    services = [render_template(template_dir, template, env_vars) for template in templates]
    return "\n".join(services)

def main():
    parser = argparse.ArgumentParser(description='Generate docker-compose configuration.')
    parser.add_argument('output', type=Path, help='Path to the output docker-compose file')
    parser.add_argument('--template-dir', type=Path, default=Path('.templates'), help='Path to the templates directory')
    args = parser.parse_args()

    with args.output.open('w') as f:
        f.write(generate_docker_compose(args.template_dir))

if __name__ == "__main__":
    main()
